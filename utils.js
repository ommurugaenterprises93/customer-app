// Utility functions for print file analysis, pricing, and document generation

// 1. DPI Calculator
// Standard Paper Sizes in Inches:
// A5: 5.8 x 8.3 | A4: 8.3 x 11.7 | A3: 11.7 x 16.5 | Letter: 8.5 x 11.0
const PAPER_SIZES = {
  A5: { short: 5.8, long: 8.3, name: "A5 (5.8\" × 8.3\")" },
  A4: { short: 8.3, long: 11.7, name: "A4 (8.3\" × 11.7\")" },
  A3: { short: 11.7, long: 16.5, name: "A3 (11.7\" × 16.5\")" },
  Letter: { short: 8.5, long: 11.0, name: "Letter (8.5\" × 11.0\")" }
};

function calculateDpi(width, height, paperSizeKey) {
  const size = PAPER_SIZES[paperSizeKey];
  if (!size || !width || !height) return 0;

  let paperWidth, paperHeight;
  // Orient paper to match image aspect ratio
  if (width > height) {
    paperWidth = size.long;
    paperHeight = size.short;
  } else {
    paperWidth = size.short;
    paperHeight = size.long;
  }

  const dpiW = width / paperWidth;
  const dpiH = height / paperHeight;

  // Estimated DPI is the lower of width or height DPI to ensure quality
  return Math.round(Math.min(dpiW, dpiH));
}

// 2. Binary JPEG Scanner for RGB vs CMYK
// Standard web decoders load images into Canvas as RGB.
// To detect if the source JPEG is CMYK, we scan its binary markers for Start of Frame (SOF) marker details.
function detectColorMode(arrayBuffer, fileType) {
  // Only JPEG can realistically support CMYK in web environments
  if (!fileType.includes("jpeg") && !fileType.includes("jpg")) {
    return "RGB";
  }

  const view = new DataView(arrayBuffer);
  let offset = 0;
  const length = view.byteLength;

  // Check SOI (Start of Image) marker: 0xFFD8
  if (length < 2 || view.getUint16(0) !== 0xFFD8) {
    return "RGB";
  }

  offset += 2;

  while (offset < length - 2) {
    const marker = view.getUint16(offset);
    offset += 2;

    // Check for SOF markers: 0xFFC0 - 0xFFCF (except FFC4 DHT, FFC8 JPG, FFCC DAC)
    const isSof = marker >= 0xFFC0 && marker <= 0xFFCF && marker !== 0xFFC4 && marker !== 0xFFC8 && marker !== 0xFFCC;

    if (isSof) {
      // Structure of SOF block:
      // Length: 2 bytes
      // Data Precision: 1 byte
      // Height: 2 bytes
      // Width: 2 bytes
      // Number of components: 1 byte (Offset is 2 + 1 + 2 + 2 = 7 bytes from start of block)
      if (offset + 7 < length) {
        const components = view.getUint8(offset + 7);
        if (components === 4) {
          return "CMYK"; // 4 components is CMYK
        } else if (components === 3) {
          return "RGB"; // 3 components is YCbCr or RGB
        } else if (components === 1) {
          return "Grayscale";
        }
      }
      break;
    } else {
      // Read length of marker segment and skip it
      if (offset + 2 <= length) {
        const segmentLength = view.getUint16(offset);
        offset += segmentLength;
      } else {
        break;
      }
    }
  }

  return "RGB";
}

// 3. Pricing Calculator
function calculatePrice({ paperSize, printColor, finishOptions = [], fulfilmentType, copies = 1 }) {
  const basePrice = 1.00;
  
  const paperPrices = {
    A5: 0.50,
    A4: 1.00,
    A3: 2.50,
    Letter: 1.20
  };
  const paperCost = paperPrices[paperSize] || 0;

  const colorCost = printColor === "Color" ? 0.80 : 0.10;

  const finishPrices = {
    Matte: 0.20,
    Glossy: 0.40,
    Lamination: 0.75,
    Binding: 1.50
  };
  const finishesCost = finishOptions.reduce((sum, opt) => sum + (finishPrices[opt] || 0), 0);

  const deliveryCost = fulfilmentType === "Delivery" ? 3.99 : 0.00;

  // Itemized breakdown calculations
  const unitCost = basePrice + paperCost + colorCost + finishesCost;
  const subtotal = unitCost * copies;
  const tax = subtotal * 0.08; // 8% Tax
  const total = subtotal + tax + deliveryCost;

  return {
    breakdown: {
      base: Number(basePrice.toFixed(2)),
      paper: Number(paperCost.toFixed(2)),
      color: Number(colorCost.toFixed(2)),
      finishes: Number(finishesCost.toFixed(2)),
      delivery: Number(deliveryCost.toFixed(2)),
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2))
    },
    total: Number(total.toFixed(2))
  };
}

// 4. Clean HTML Invoice Generator
function triggerInvoicePrint(order) {
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) {
    alert("Please allow popups to download/print invoices.");
    return;
  }

  const finishesText = order.finish_options.length > 0 ? order.finish_options.join(", ") : "None";
  const dateText = new Date(order.timestamps.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const subtotal = order.price_breakdown.subtotal;
  const tax = order.price_breakdown.tax;
  const delivery = order.price_breakdown.delivery;
  const total = order.total_amount;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Invoice - ${order.id}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin: 40px;
          color: #1f2937;
          background: #ffffff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 24px;
        }
        .brand {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #4f46e5;
        }
        .invoice-details {
          text-align: right;
        }
        .invoice-title {
          font-size: 20px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }
        .meta-section h3 {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6b7280;
          margin-bottom: 8px;
        }
        .meta-section p {
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 40px;
        }
        th {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6b7280;
          text-align: left;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 12px;
        }
        td {
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
          font-size: 14px;
        }
        .total-table {
          margin-top: 24px;
          width: 300px;
          margin-left: auto;
        }
        .total-table td {
          border-bottom: none;
          padding: 8px 0;
        }
        .grand-total {
          border-top: 1px solid #e5e7eb;
          font-size: 18px;
          font-weight: 700;
          color: #4f46e5;
          padding-top: 12px !important;
        }
        .footer {
          margin-top: 60px;
          border-top: 1px solid #e5e7eb;
          padding-top: 24px;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
        }
        @media print {
          body { margin: 20px; }
          .print-btn { display: none; }
        }
        .print-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #4f46e5;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
          transition: background 0.2s;
        }
        .print-btn:hover {
          background: #4338ca;
        }
      </style>
    </head>
    <body>
      <button class="print-btn" onclick="window.print()">Print Invoice</button>
      
      <div class="header">
        <div>
          <div class="brand">PRINT.MARKET</div>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">High Fidelity Print Marketplace</p>
        </div>
        <div class="invoice-details">
          <div class="invoice-title">INVOICE</div>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">ID: ${order.id}</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #9ca3af;">Date: ${dateText}</p>
        </div>
      </div>

      <div class="meta-grid">
        <div class="meta-section">
          <h3>Billed To</h3>
          <p>Customer: ${order.delivery_address ? "Delivery Address" : "Self-Pickup"}</p>
          <p style="font-weight: 500;">${order.delivery_address || "Picked up in person at Central Press Shop"}</p>
        </div>
        <div class="meta-section" style="text-align: right;">
          <h3>Payment Status</h3>
          <p style="font-size: 16px; font-weight: 600; color: #10b981;">Paid - Mock Payment Gateway</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: center;">DPI</th>
            <th style="text-align: center;">Copies</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style="font-weight: 600; margin-bottom: 4px;">Print Order: ${order.file_name}</div>
              <div style="font-size: 12px; color: #6b7280;">
                Size: ${order.paper_size} | Color Mode: ${order.color_mode} | Tone: ${order.print_color} | Finishes: ${finishesText}
              </div>
            </td>
            <td style="text-align: center;">${order.detected_dpi}</td>
            <td style="text-align: center;">${order.copies}</td>
            <td style="text-align: right; font-weight: 500;">$${subtotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <table class="total-table">
        <tbody>
          <tr>
            <td style="color: #6b7280;">Subtotal</td>
            <td style="text-align: right; font-weight: 500;">$${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="color: #6b7280;">Estimated Tax (8%)</td>
            <td style="text-align: right; font-weight: 500;">$${tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="color: #6b7280;">Fulfillment (${order.fulfilment_type})</td>
            <td style="text-align: right; font-weight: 500;">$${delivery.toFixed(2)}</td>
          </tr>
          <tr>
            <td class="grand-total">Total Amount</td>
            <td class="grand-total" style="text-align: right;">$${total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p>Thank you for choosing Print.Market. For support, please contact help@print.market.</p>
        <p style="font-size: 10px; margin-top: 8px;">Subject to terms, refunds available only for wrong products within 7 days.</p>
      </div>

      <script>
        // Auto trigger print dialog on load
        window.addEventListener("load", () => {
          setTimeout(() => {
            window.print();
          }, 300);
        });
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
