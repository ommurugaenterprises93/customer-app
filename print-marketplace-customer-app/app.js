// Application State
const state = {
  currentScreen: 'home',
  currentUser: null,
  cart: {
    file: null,
    fileName: '',
    fileSize: '',
    fileType: '',
    imageDimensions: { width: 0, height: 0 },
    colorMode: 'RGB',
    paperSize: 'A4',
    printColor: 'Color',
    finishOptions: [],
    copies: 1,
    fulfilmentType: 'Pickup',
    deliveryAddress: '',
    price: null
  },
  activeTrackingOrderId: null,
  activeRatingOrderId: null,
  activeRefundOrderId: null,
  selectedRating: 0
};

// ================= DOM ELEMENTS =================
const DOM = {
  screens: document.querySelectorAll('.screen'),
  navLinks: document.querySelectorAll('.nav-link'),
  header: document.getElementById('app-header'),
  logo: document.getElementById('nav-logo'),
  userPhoneBadge: document.getElementById('user-phone-badge'),
  btnLogout: document.getElementById('btn-logout'),

  // Auth Screen
  authForm: document.getElementById('auth-form'),
  phoneGroup: document.getElementById('phone-group'),
  otpGroup: document.getElementById('otp-group'),
  phoneInput: document.getElementById('phone-input'),
  otpInput: document.getElementById('otp-input'),
  btnAuthSubmit: document.getElementById('btn-auth-submit'),

  // Home Screen
  btnHeroOrder: document.getElementById('btn-hero-order'),
  cardEntryOrder: document.getElementById('card-entry-order'),
  cardEntryFreelancers: document.getElementById('card-entry-freelancers'),

  // Upload Screen
  dropZone: document.getElementById('drop-zone'),
  fileInputRaw: document.getElementById('file-input-raw'),
  fileMetadataContainer: document.getElementById('file-metadata-container'),
  filePreviewThumb: document.getElementById('file-preview-thumb'),
  metaFileName: document.getElementById('meta-file-name'),
  metaFileSize: document.getElementById('meta-file-size'),
  metaFileType: document.getElementById('meta-file-type'),
  metaFileDimensions: document.getElementById('meta-file-dimensions'),
  btnReupload: document.getElementById('btn-reupload'),
  resWarningBanner: document.getElementById('resolution-warning-banner'),
  warnDpiVal: document.getElementById('warn-dpi-val'),
  colorWarningBanner: document.getElementById('color-warning-banner'),
  btnUploadNext: document.getElementById('btn-upload-next'),

  // Configure Screen
  paperGrid: document.getElementById('paper-sizes-grid'),
  colorToggleControl: document.getElementById('color-toggle-control'),
  finishesGrid: document.getElementById('finishes-grid'),
  btnQtyMinus: document.getElementById('btn-qty-minus'),
  btnQtyPlus: document.getElementById('btn-qty-plus'),
  qtyValue: document.getElementById('qty-value'),
  btnConfigNext: document.getElementById('btn-config-next'),
  btnConfigBack: document.getElementById('btn-config-back'),

  // Configure Summary Columns
  summaryPaperVal: document.getElementById('summary-paper-val'),
  summaryColorVal: document.getElementById('summary-color-val'),
  summaryDpiVal: document.getElementById('summary-dpi-val'),
  summaryFinishesVal: document.getElementById('summary-finishes-val'),
  summaryQtyVal: document.getElementById('summary-qty-val'),
  priceBaseVal: document.getElementById('price-base-val'),
  pricePaperVal: document.getElementById('price-paper-val'),
  priceColorVal: document.getElementById('price-color-val'),
  priceFinishesVal: document.getElementById('price-finishes-val'),
  subtotalQtyVal: document.getElementById('subtotal-qty-val'),
  priceSubtotalVal: document.getElementById('price-subtotal-val'),
  priceTaxVal: document.getElementById('price-tax-val'),
  priceTotalVal: document.getElementById('price-total-val'),
  configDpiWarning: document.getElementById('config-dpi-warning'),

  // Fulfillment Screen
  fulfillmentToggleControl: document.getElementById('fulfillment-toggle-control'),
  pickupOptionsSection: document.getElementById('pickup-options-section'),
  deliveryOptionsSection: document.getElementById('delivery-options-section'),
  savedAddressesList: document.getElementById('saved-addresses-list'),
  btnTriggerAddAddress: document.getElementById('btn-trigger-add-address'),
  addAddressFormBox: document.getElementById('add-address-form-box'),
  txtNewAddress: document.getElementById('txt-new-address'),
  btnSaveAddress: document.getElementById('btn-save-address'),
  btnCancelAddress: document.getElementById('btn-cancel-address'),
  fulfillmentSpecsSummary: document.getElementById('fulfillment-specs-summary'),
  fulfillmentMethodSummary: document.getElementById('fulfillment-method-summary'),
  fulfillmentDestinationSummary: document.getElementById('fulfillment-destination-summary'),
  fulfillmentSubtotalVal: document.getElementById('fulfillment-subtotal-val'),
  fulfillmentDeliveryVal: document.getElementById('fulfillment-delivery-val'),
  fulfillmentTaxVal: document.getElementById('fulfillment-tax-val'),
  fulfillmentTotalVal: document.getElementById('fulfillment-total-val'),
  btnFulfillmentNext: document.getElementById('btn-fulfillment-next'),
  btnFulfillmentBack: document.getElementById('btn-fulfillment-back'),

  // Payment Screen
  revFileName: document.getElementById('rev-file-name'),
  revPaperSize: document.getElementById('rev-paper-size'),
  revColor: document.getElementById('rev-color'),
  revDpi: document.getElementById('rev-dpi'),
  revQty: document.getElementById('rev-qty'),
  revFinishes: document.getElementById('rev-finishes'),
  revFulfillment: document.getElementById('rev-fulfillment'),
  checkoutPricingBreakdown: document.getElementById('checkout-pricing-breakdown'),
  btnPayNow: document.getElementById('btn-pay-now'),
  btnPayBack: document.getElementById('btn-pay-back'),
  linkPolicyCancellation: document.getElementById('link-policy-cancellation'),

  // Tracking Screen
  trackOrderId: document.getElementById('track-order-id'),
  trackOrderDate: document.getElementById('track-order-date'),
  trackStatusBadge: document.getElementById('track-status-badge'),
  btnCancelOrder: document.getElementById('btn-cancel-order'),
  cancelTooltipText: document.getElementById('cancel-tooltip-text'),
  trackPaper: document.getElementById('track-paper'),
  trackColor: document.getElementById('track-color'),
  trackDpi: document.getElementById('track-dpi'),
  trackQty: document.getElementById('track-qty'),
  trackFinishes: document.getElementById('track-finishes'),
  trackFulfilment: document.getElementById('track-fulfilment'),
  trackTotal: document.getElementById('track-total'),
  btnTrackingHistory: document.getElementById('btn-tracking-history'),
  btnTrackingSimulator: document.getElementById('btn-tracking-simulator'),

  // Timeline time labels
  timePlaced: document.getElementById('time-placed'),
  timePaymentConfirmed: document.getElementById('time-payment-confirmed'),
  timeVendorAccepted: document.getElementById('time-vendor-accepted'),
  timePrinting: document.getElementById('time-printing'),
  timeReady: document.getElementById('time-ready'),
  timeDelivered: document.getElementById('time-delivered'),

  // History Screen
  ordersListContainer: document.getElementById('orders-list-container'),
  historyOrderTrigger: document.getElementById('history-order-trigger'),

  // Freelancer Screen
  designerDirectoryGrid: document.getElementById('designer-directory-grid'),
  btnAdminManageFreelancers: document.getElementById('btn-admin-manage-freelancers'),

  // Footer navigation overrides
  footerLinkOrder: document.getElementById('footer-link-order'),
  footerLinkFreelancers: document.getElementById('footer-link-freelancers'),
  footerLinkHistory: document.getElementById('footer-link-history'),
  footerLinkPolicy: document.getElementById('footer-link-policy'),
  footerLinkAdmin: document.getElementById('footer-link-admin'),

  // Modals overlays
  modalRatingOverlay: document.getElementById('modal-rating-overlay'),
  stars: document.querySelectorAll('.star'),
  txtRatingComments: document.getElementById('txt-rating-comments'),
  btnSubmitRating: document.getElementById('btn-submit-rating'),
  btnCloseRating: document.getElementById('btn-close-rating'),

  modalRefundOverlay: document.getElementById('modal-refund-overlay'),
  selectRefundReason: document.getElementById('select-refund-reason'),
  txtRefundDesc: document.getElementById('txt-refund-desc'),
  btnRefundUploadTrigger: document.getElementById('btn-refund-upload-trigger'),
  refundFileInput: document.getElementById('refund-file-input'),
  refundPreviewImgBox: document.getElementById('refund-preview-img-box'),
  btnSubmitRefund: document.getElementById('btn-submit-refund'),
  btnCloseRefund: document.getElementById('btn-close-refund'),

  modalFreelancerOverlay: document.getElementById('modal-freelancer-overlay'),
  freelancerForm: document.getElementById('freelancer-form'),
  freelancerModalTitle: document.getElementById('freelancer-modal-title'),
  flEditId: document.getElementById('fl-edit-id'),
  flName: document.getElementById('fl-name'),
  flSpecialization: document.getElementById('fl-specialization'),
  flBio: document.getElementById('fl-bio'),
  flPhone: document.getElementById('fl-phone'),
  flPhoto: document.getElementById('fl-photo'),
  btnSubmitFreelancer: document.getElementById('btn-submit-freelancer'),
  btnCloseFreelancer: document.getElementById('btn-close-freelancer'),

  // Admin view tables
  adminOrdersTableBody: document.getElementById('admin-orders-table-body'),
  btnAdminAddFreelancer: document.getElementById('btn-admin-add-freelancer'),
  adminFreelancersTableBody: document.getElementById('admin-freelancers-table-body')
};

// ================= ROUTING =================
function showScreen(screenId) {
  // Enforce authentication check
  if (!state.currentUser && screenId !== 'auth') {
    screenId = 'auth';
  }

  state.currentScreen = screenId;
  DOM.screens.forEach(screen => {
    screen.classList.remove('active');
    if (screen.id === `screen-${screenId}`) {
      screen.classList.add('active');
    }
  });

  // Highlight Nav Links
  DOM.navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-screen') === screenId) {
      link.classList.add('active');
    }
  });

  // Screen-specific hooks
  if (screenId === 'history') {
    renderOrderHistory();
  } else if (screenId === 'freelancers') {
    renderFreelancerDirectory();
  } else if (screenId === 'admin') {
    renderAdminConsole();
  } else if (screenId === 'tracking' && state.activeTrackingOrderId) {
    renderTrackingScreen(state.activeTrackingOrderId);
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// Navigation event setup
DOM.navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const screen = link.getAttribute('data-screen');
    showScreen(screen);
  });
});

DOM.logo.addEventListener('click', () => showScreen('home'));

// Footer & Policy redirects
DOM.footerLinkOrder.addEventListener('click', () => showScreen('upload'));
DOM.footerLinkFreelancers.addEventListener('click', () => showScreen('freelancers'));
DOM.footerLinkHistory.addEventListener('click', () => showScreen('history'));
DOM.footerLinkPolicy.addEventListener('click', () => showScreen('policy'));
DOM.footerLinkAdmin.addEventListener('click', () => showScreen('admin'));
DOM.linkPolicyCancellation.addEventListener('click', () => showScreen('policy'));

// ================= AUTHENTICATION FLOW =================
function handleAuthSubmit() {
  const phone = DOM.phoneInput.value.trim();
  
  if (DOM.otpGroup.style.display === 'none') {
    // Stage 1: Send OTP
    if (!phone) return;
    DOM.phoneInput.disabled = true;
    DOM.otpGroup.style.display = 'block';
    DOM.btnAuthSubmit.textContent = 'Verify OTP & Log In';
  } else {
    // Stage 2: Verify OTP
    const otp = DOM.otpInput.value.trim();
    if (otp.length === 4) {
      // Mock validation success
      db.setCurrentUser(phone);
    } else {
      alert('Please enter a valid 4-digit verification code.');
    }
  }
}

DOM.btnAuthSubmit.addEventListener('click', handleAuthSubmit);

DOM.btnLogout.addEventListener('click', () => {
  db.logout();
});

// Watch Auth Changes
window.addEventListener('auth-change', () => {
  const user = db.getCurrentUser();
  state.currentUser = user;
  if (user) {
    DOM.userPhoneBadge.textContent = user;
    DOM.header.style.display = 'block';
    DOM.phoneInput.value = '';
    DOM.otpInput.value = '';
    DOM.phoneInput.disabled = false;
    DOM.otpGroup.style.display = 'none';
    DOM.btnAuthSubmit.textContent = 'Continue';
    showScreen('home');
  } else {
    DOM.header.style.display = 'none';
    showScreen('auth');
  }
});

// Initialize User - Bypassing login screen by default
let initialUser = db.getCurrentUser();
if (!initialUser) {
  db.setCurrentUser('+1 (555) 012-3456');
  initialUser = '+1 (555) 012-3456';
}
state.currentUser = initialUser;
DOM.userPhoneBadge.textContent = initialUser;
DOM.header.style.display = 'block';
showScreen('home');

// ================= HOME SCREEN CONTROLS =================
DOM.btnHeroOrder.addEventListener('click', () => showScreen('upload'));
DOM.cardEntryOrder.addEventListener('click', () => showScreen('upload'));
DOM.cardEntryFreelancers.addEventListener('click', () => showScreen('freelancers'));

// ================= STEP 1: UPLOAD CONTROLS =================
DOM.dropZone.addEventListener('click', () => DOM.fileInputRaw.click());

DOM.dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  DOM.dropZone.classList.add('dragover');
});

DOM.dropZone.addEventListener('dragleave', () => {
  DOM.dropZone.classList.remove('dragover');
});

DOM.dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  DOM.dropZone.classList.remove('dragover');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    processUploadedFile(files[0]);
  }
});

DOM.fileInputRaw.addEventListener('change', () => {
  if (DOM.fileInputRaw.files.length > 0) {
    processUploadedFile(DOM.fileInputRaw.files[0]);
  }
});

DOM.btnReupload.addEventListener('click', resetUploadState);

function resetUploadState() {
  state.cart.file = null;
  state.cart.fileName = '';
  state.cart.fileSize = '';
  state.cart.fileType = '';
  state.cart.imageDimensions = { width: 0, height: 0 };
  state.cart.colorMode = 'RGB';
  
  DOM.fileInputRaw.value = '';
  DOM.fileMetadataContainer.style.display = 'none';
  DOM.dropZone.style.display = 'block';
  DOM.resWarningBanner.style.display = 'none';
  DOM.colorWarningBanner.style.display = 'none';
}

function processUploadedFile(file) {
  state.cart.file = file;
  state.cart.fileName = file.name;
  state.cart.fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
  state.cart.fileType = file.type || 'Unknown Format';
  
  DOM.metaFileName.textContent = state.cart.fileName;
  DOM.metaFileSize.textContent = state.cart.fileSize;
  DOM.metaFileType.textContent = state.cart.fileType.split('/')[1]?.toUpperCase() || 'FILE';

  DOM.dropZone.style.display = 'none';
  DOM.fileMetadataContainer.style.display = 'block';

  // Determine file preview thumbnail
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      DOM.filePreviewThumb.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
      
      // Load image to extract dimensions in pixels
      const img = new Image();
      img.onload = () => {
        state.cart.imageDimensions = { width: img.width, height: img.height };
        DOM.metaFileDimensions.textContent = `Dimensions: ${img.width} × ${img.height} px`;
        
        // JPEG binary scanner for color mode check
        const binaryReader = new FileReader();
        binaryReader.onload = () => {
          state.cart.colorMode = detectColorMode(binaryReader.result, file.type);
          postFileAnalyze();
        };
        binaryReader.readAsArrayBuffer(file);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    // PDF / Documents Mock Processing
    DOM.filePreviewThumb.textContent = '📄';
    // Assume standard 300 DPI A4 page for PDFs for demonstration purposes
    state.cart.imageDimensions = { width: 2480, height: 3508 };
    state.cart.colorMode = 'CMYK'; // PDFs are usually pre-processed CMYK
    DOM.metaFileDimensions.textContent = 'Dimensions: Standard Document Layout';
    postFileAnalyze();
  }
}

function postFileAnalyze() {
  updateDpiAndWarnings();
  recalculateCartPrice();
}

function updateDpiAndWarnings() {
  const width = state.cart.imageDimensions.width;
  const height = state.cart.imageDimensions.height;
  const paper = state.cart.paperSize;
  
  if (width && height) {
    const estimatedDpi = calculateDpi(width, height, paper);
    state.cart.detected_dpi = estimatedDpi;

    // Warning Check: DPI < 150
    if (estimatedDpi < 150) {
      DOM.resWarningBanner.style.display = 'flex';
      DOM.warnDpiVal.textContent = estimatedDpi;
      DOM.configDpiWarning.style.display = 'block';
      DOM.summaryDpiVal.innerHTML = `<span style="color: var(--danger); font-weight: 700;">${estimatedDpi} DPI (Low Quality)</span>`;
    } else {
      DOM.resWarningBanner.style.display = 'none';
      DOM.configDpiWarning.style.display = 'none';
      DOM.summaryDpiVal.innerHTML = `<span style="color: var(--success); font-weight: 700;">${estimatedDpi} DPI (Excellent)</span>`;
    }
  }

  // Warning Check: Color Mode == RGB
  if (state.cart.colorMode === 'RGB') {
    DOM.colorWarningBanner.style.display = 'flex';
  } else {
    DOM.colorWarningBanner.style.display = 'none';
  }
}

DOM.btnUploadNext.addEventListener('click', () => {
  showScreen('configure');
});

// ================= STEP 2: CONFIGURE CONTROLS =================

// Paper Size selection grid handlers
DOM.paperGrid.addEventListener('click', (e) => {
  const option = e.target.closest('.paper-option');
  if (!option) return;

  // Update styles
  DOM.paperGrid.querySelectorAll('.paper-option').forEach(opt => opt.classList.remove('selected'));
  option.classList.add('selected');

  state.cart.paperSize = option.getAttribute('data-size');
  DOM.summaryPaperVal.textContent = PAPER_SIZES[state.cart.paperSize].name;

  postFileAnalyze();
});

// Color Mode toggle segmented control
DOM.colorToggleControl.addEventListener('click', (e) => {
  const btn = e.target.closest('.segment-btn');
  if (!btn) return;

  DOM.colorToggleControl.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  state.cart.printColor = btn.getAttribute('data-color');
  DOM.summaryColorVal.textContent = state.cart.printColor === 'Color' ? 'Full Color' : 'Black & White';

  recalculateCartPrice();
});

// Finishes selection list
DOM.finishesGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.checkbox-card');
  if (!card) return;

  const checkbox = card.querySelector('input[type="checkbox"]');
  // Toggle check if click was on card itself
  if (e.target !== checkbox) {
    checkbox.checked = !checkbox.checked;
  }

  const finish = card.getAttribute('data-finish');
  if (checkbox.checked) {
    card.classList.add('selected');
    if (!state.cart.finishOptions.includes(finish)) {
      state.cart.finishOptions.push(finish);
    }
  } else {
    card.classList.remove('selected');
    state.cart.finishOptions = state.cart.finishOptions.filter(f => f !== finish);
  }

  DOM.summaryFinishesVal.textContent = state.cart.finishOptions.join(', ') || 'None';
  recalculateCartPrice();
});

// Stepper Quantity Multipliers
DOM.btnQtyMinus.addEventListener('click', () => {
  if (state.cart.copies > 1) {
    state.cart.copies--;
    updateQtyUI();
  }
});

DOM.btnQtyPlus.addEventListener('click', () => {
  state.cart.copies++;
  updateQtyUI();
});

function updateQtyUI() {
  DOM.qtyValue.textContent = state.cart.copies;
  DOM.summaryQtyVal.textContent = state.cart.copies + (state.cart.copies === 1 ? ' copy' : ' copies');
  DOM.subtotalQtyVal.textContent = state.cart.copies;
  recalculateCartPrice();
}

function recalculateCartPrice() {
  const priceResult = calculatePrice({
    paperSize: state.cart.paperSize,
    printColor: state.cart.printColor,
    finishOptions: state.cart.finishOptions,
    fulfilmentType: state.cart.fulfilmentType,
    copies: state.cart.copies
  });

  state.cart.price = priceResult;

  // Render pricing details in Configure column
  DOM.priceBaseVal.textContent = `$${priceResult.breakdown.base.toFixed(2)}`;
  DOM.pricePaperVal.textContent = `+$${priceResult.breakdown.paper.toFixed(2)}`;
  DOM.priceColorVal.textContent = `+$${priceResult.breakdown.color.toFixed(2)}`;
  DOM.priceFinishesVal.textContent = `+$${priceResult.breakdown.finishes.toFixed(2)}`;
  DOM.priceSubtotalVal.textContent = `$${priceResult.breakdown.subtotal.toFixed(2)}`;
  DOM.priceTaxVal.textContent = `$${priceResult.breakdown.tax.toFixed(2)}`;
  DOM.priceTotalVal.textContent = `$${priceResult.total.toFixed(2)}`;
  
  // Render details in Fulfillment Summary
  DOM.fulfillmentSpecsSummary.textContent = `${state.cart.paperSize}, ${state.cart.printColor}`;
  DOM.fulfillmentSubtotalVal.textContent = `$${priceResult.breakdown.subtotal.toFixed(2)}`;
  DOM.fulfillmentDeliveryVal.textContent = `+$${priceResult.breakdown.delivery.toFixed(2)}`;
  DOM.fulfillmentTaxVal.textContent = `$${priceResult.breakdown.tax.toFixed(2)}`;
  DOM.fulfillmentTotalVal.textContent = `$${priceResult.total.toFixed(2)}`;
}

DOM.btnConfigNext.addEventListener('click', () => {
  renderFulfillmentScreen();
  showScreen('fulfilment');
});

DOM.btnConfigBack.addEventListener('click', () => {
  showScreen('upload');
});

// ================= STEP 3: FULFILLMENT CONTROLS =================

DOM.fulfillmentToggleControl.addEventListener('click', (e) => {
  const btn = e.target.closest('.segment-btn');
  if (!btn) return;

  DOM.fulfillmentToggleControl.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const selectedType = btn.getAttribute('data-type');
  state.cart.fulfilmentType = selectedType;

  if (selectedType === 'Pickup') {
    DOM.pickupOptionsSection.style.display = 'block';
    DOM.deliveryOptionsSection.style.display = 'none';
    state.cart.deliveryAddress = 'Central Printing Press Depot';
  } else {
    DOM.pickupOptionsSection.style.display = 'none';
    DOM.deliveryOptionsSection.style.display = 'block';
    renderAddressList();
  }

  DOM.fulfillmentMethodSummary.textContent = selectedType === 'Pickup' ? 'Self-Pickup' : 'Home Delivery';
  DOM.fulfillmentDestinationSummary.textContent = state.cart.deliveryAddress || 'None';

  recalculateCartPrice();
});

// Address list rendering & select logic
function renderAddressList() {
  const addresses = db.getAddresses();
  DOM.savedAddressesList.innerHTML = '';
  
  if (addresses.length === 0) {
    DOM.savedAddressesList.innerHTML = `
      <div style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 12px; border: 1px dashed var(--border);">
        No saved addresses found. Please add a delivery destination below.
      </div>
    `;
    state.cart.deliveryAddress = '';
    DOM.fulfillmentDestinationSummary.textContent = 'Add address';
    return;
  }

  addresses.forEach((addr, idx) => {
    const isSelected = state.cart.deliveryAddress === addr || (idx === 0 && !state.cart.deliveryAddress);
    if (isSelected) {
      state.cart.deliveryAddress = addr;
      DOM.fulfillmentDestinationSummary.textContent = addr;
    }

    const item = document.createElement('div');
    item.className = `address-option ${isSelected ? 'selected' : ''}`;
    item.innerHTML = `
      <input type="radio" name="delivery-addr" ${isSelected ? 'checked' : ''}>
      <div class="address-text" style="flex: 1;">${addr}</div>
      <button class="btn-logout btn-addr-delete" style="font-size: 11px; padding: 0 4px;" data-addr="${addr}">Delete</button>
    `;

    // Click on address radio selection
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-addr-delete')) return;
      
      DOM.savedAddressesList.querySelectorAll('.address-option').forEach(o => o.classList.remove('selected'));
      item.classList.add('selected');
      item.querySelector('input').checked = true;
      state.cart.deliveryAddress = addr;
      DOM.fulfillmentDestinationSummary.textContent = addr;
    });

    DOM.savedAddressesList.appendChild(item);
  });

  // Attach delete events
  DOM.savedAddressesList.querySelectorAll('.btn-addr-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const addrToDelete = btn.getAttribute('data-addr');
      if (confirm('Delete this address?')) {
        db.deleteAddress(addrToDelete);
        if (state.cart.deliveryAddress === addrToDelete) {
          state.cart.deliveryAddress = '';
        }
        renderAddressList();
      }
    });
  });
}

function renderFulfillmentScreen() {
  if (state.cart.fulfilmentType === 'Pickup') {
    state.cart.deliveryAddress = 'Central Printing Press Depot';
  } else {
    renderAddressList();
  }
  DOM.fulfillmentMethodSummary.textContent = state.cart.fulfilmentType === 'Pickup' ? 'Self-Pickup' : 'Home Delivery';
  DOM.fulfillmentDestinationSummary.textContent = state.cart.deliveryAddress || 'None';
  recalculateCartPrice();
}

DOM.btnTriggerAddAddress.addEventListener('click', () => {
  DOM.addAddressFormBox.style.display = 'block';
  DOM.btnTriggerAddAddress.style.display = 'none';
  DOM.txtNewAddress.focus();
});

DOM.btnCancelAddress.addEventListener('click', () => {
  DOM.addAddressFormBox.style.display = 'none';
  DOM.btnTriggerAddAddress.style.display = 'block';
  DOM.txtNewAddress.value = '';
});

DOM.btnSaveAddress.addEventListener('click', () => {
  const newAddr = DOM.txtNewAddress.value.trim();
  if (newAddr) {
    db.addAddress(newAddr);
    state.cart.deliveryAddress = newAddr;
    DOM.txtNewAddress.value = '';
    DOM.addAddressFormBox.style.display = 'none';
    DOM.btnTriggerAddAddress.style.display = 'block';
    renderAddressList();
  }
});

DOM.btnFulfillmentNext.addEventListener('click', () => {
  if (state.cart.fulfilmentType === 'Delivery' && !state.cart.deliveryAddress) {
    alert('Please select or add a delivery address to proceed.');
    return;
  }
  renderPaymentScreen();
  showScreen('payment');
});

DOM.btnFulfillmentBack.addEventListener('click', () => {
  showScreen('configure');
});

// ================= STEP 4: REVIEW & PAYMENT CONTROLS =================

function renderPaymentScreen() {
  DOM.revFileName.textContent = state.cart.fileName;
  DOM.revPaperSize.textContent = PAPER_SIZES[state.cart.paperSize].name;
  DOM.revColor.textContent = state.cart.printColor === 'Color' ? 'Full Color' : 'Black & White';
  DOM.revDpi.textContent = `${state.cart.detected_dpi || 300} DPI`;
  DOM.revQty.textContent = `${state.cart.copies} Copy(s)`;
  DOM.revFinishes.textContent = state.cart.finishOptions.join(', ') || 'None';
  DOM.revFulfillment.textContent = `${state.cart.fulfilmentType} - ${state.cart.deliveryAddress}`;

  // Populate checkout itemized list
  const breakdown = state.cart.price.breakdown;
  const total = state.cart.price.total;

  DOM.checkoutPricingBreakdown.innerHTML = `
    <div class="summary-row">
      <span>Subtotal (× ${state.cart.copies})</span>
      <strong>$${breakdown.subtotal.toFixed(2)}</strong>
    </div>
    <div class="summary-row">
      <span>Tax (8%)</span>
      <strong>$${breakdown.tax.toFixed(2)}</strong>
    </div>
    <div class="summary-row">
      <span>Fulfillment (${state.cart.fulfilmentType})</span>
      <strong>$${breakdown.delivery.toFixed(2)}</strong>
    </div>
    <div class="summary-row total-row" style="margin-top: 12px; padding-top: 12px;">
      <span>Total Paid</span>
      <strong class="summary-val-total" style="font-size: 20px;">$${total.toFixed(2)}</strong>
    </div>
  `;
}

DOM.btnPayNow.addEventListener('click', () => {
  DOM.btnPayNow.disabled = true;
  DOM.btnPayNow.innerHTML = `⚙️ Processing checkout...`;

  setTimeout(() => {
    // Create new order record
    const newOrder = db.addOrder({
      file_name: state.cart.fileName,
      file_url: 'blob:mock-url', // In real app, object url is used
      file_format: state.cart.fileType,
      image_dimensions: state.cart.imageDimensions,
      detected_dpi: state.cart.detected_dpi || 300,
      color_mode: state.cart.colorMode,
      paper_size: state.cart.paperSize,
      copies: state.cart.copies,
      print_color: state.cart.printColor,
      finish_options: state.cart.finishOptions,
      fulfilment_type: state.cart.fulfilmentType,
      delivery_address: state.cart.deliveryAddress,
      price_breakdown: state.cart.price.breakdown,
      total_amount: state.cart.price.total,
      payment_status: 'Paid',
      order_status: 'Placed',
      cancellation_eligible: true,
      refund_status: null,
      rating: null,
      phone_owner: state.currentUser
    });

    // Reset wizard
    resetUploadState();
    DOM.btnPayNow.disabled = false;
    DOM.btnPayNow.innerHTML = `💳 Pay Now & Place Order`;

    // Redirect to Tracking
    state.activeTrackingOrderId = newOrder.id;
    showScreen('tracking');
  }, 1500);
});

DOM.btnPayBack.addEventListener('click', () => {
  showScreen('fulfilment');
});

// ================= ORDER TRACKING SCREEN =================

function renderTrackingScreen(orderId) {
  const order = db.getOrders().find(o => o.id === orderId);
  if (!order) return;

  DOM.trackOrderId.textContent = order.id;
  DOM.trackOrderDate.textContent = new Date(order.timestamps.created_at).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  DOM.trackStatusBadge.textContent = order.order_status;
  
  // Set badge color class
  DOM.trackStatusBadge.className = 'status-badge ' + order.order_status.toLowerCase().replace(' ', '-');

  // Fill in print specifications details
  DOM.trackPaper.textContent = order.paper_size;
  DOM.trackColor.textContent = order.print_color;
  DOM.trackDpi.textContent = `${order.detected_dpi} DPI`;
  DOM.trackQty.textContent = `${order.copies} ${order.copies === 1 ? 'copy' : 'copies'}`;
  DOM.trackFinishes.textContent = order.finish_options.join(', ') || 'None';
  DOM.trackFulfilment.textContent = `${order.fulfilment_type} (${order.delivery_address})`;
  DOM.trackTotal.textContent = `$${order.total_amount.toFixed(2)}`;

  // Enforce cancellation logic rules
  // Cancel is allowed for 'Placed', 'Payment Confirmed', 'Vendor Accepted'
  const isCancellable = ['Placed', 'Payment Confirmed', 'Vendor Accepted'].includes(order.order_status);
  DOM.btnCancelOrder.disabled = !isCancellable;

  if (isCancellable) {
    DOM.cancelTooltipText.style.visibility = 'hidden';
  } else {
    // Toggle tooltip instructions depending on status
    if (order.order_status === 'Cancelled') {
      DOM.cancelTooltipText.textContent = 'This order is already cancelled';
    } else {
      DOM.cancelTooltipText.textContent = 'Cannot cancel — order is already printing';
    }
    DOM.cancelTooltipText.style.visibility = ''; // Use CSS default hover control
  }

  // Populate timeline nodes highlighters
  const statuses = ['Placed', 'Payment Confirmed', 'Vendor Accepted', 'Printing', 'Ready', 'Delivered'];
  const currentIndex = statuses.indexOf(order.order_status === 'Collected' ? 'Delivered' : order.order_status);

  // Clear timeline times
  DOM.timePlaced.textContent = '-';
  DOM.timePaymentConfirmed.textContent = '-';
  DOM.timeVendorAccepted.textContent = '-';
  DOM.timePrinting.textContent = '-';
  DOM.timeReady.textContent = '-';
  DOM.timeDelivered.textContent = '-';

  statuses.forEach((status, idx) => {
    const stepEl = document.getElementById(`step-${status.toLowerCase().replace(' ', '-')}`);
    if (!stepEl) return;

    stepEl.classList.remove('active', 'completed');
    
    if (order.order_status === 'Cancelled') {
      // If cancelled, disable highlighted paths
      return;
    }

    if (idx === currentIndex) {
      stepEl.classList.add('active');
    } else if (idx < currentIndex) {
      stepEl.classList.add('completed');
    }
  });

  // Inject tracking event timestamp logs
  const createdDate = new Date(order.timestamps.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const updatedDate = new Date(order.timestamps.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  DOM.timePlaced.textContent = createdDate;
  if (currentIndex >= 1) DOM.timePaymentConfirmed.textContent = updatedDate;
  if (currentIndex >= 2) DOM.timeVendorAccepted.textContent = updatedDate;
  if (currentIndex >= 3) DOM.timePrinting.textContent = updatedDate;
  if (currentIndex >= 4) DOM.timeReady.textContent = updatedDate;
  if (currentIndex >= 5) DOM.timeDelivered.textContent = updatedDate;

  // Cancel order click trigger
  DOM.btnCancelOrder.onclick = () => {
    if (confirm('Are you absolutely sure you want to cancel this order? It will trigger an immediate refund.')) {
      order.order_status = 'Cancelled';
      order.cancellation_eligible = false;
      db.updateOrder(order);
      renderTrackingScreen(order.id);
    }
  };
}

DOM.btnTrackingHistory.addEventListener('click', () => showScreen('history'));
DOM.btnTrackingSimulator.addEventListener('click', () => showScreen('admin'));

// ================= ORDER HISTORY SCREEN =================

function renderOrderHistory() {
  const orders = db.getOrders().filter(o => o.phone_owner === state.currentUser);
  DOM.ordersListContainer.innerHTML = '';

  if (orders.length === 0) {
    DOM.ordersListContainer.innerHTML = `
      <div style="text-align: center; padding: 48px; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border); color: var(--text-muted);">
        No orders found. <span style="color: var(--primary); cursor: pointer; text-decoration: underline;" id="history-order-trigger">Place your first order</span>.
      </div>
    `;
    document.getElementById('history-order-trigger')?.addEventListener('click', () => showScreen('upload'));
    return;
  }

  // Show newest orders first
  orders.slice().reverse().forEach(order => {
    const card = document.createElement('div');
    card.className = 'order-card';

    const dateStr = new Date(order.timestamps.created_at).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

    const finishesText = order.finish_options.length > 0 ? order.finish_options.join(', ') : 'None';
    
    // Status Badge Markup
    let badgeClass = order.order_status.toLowerCase().replace(' ', '-');
    let badgeLabel = order.order_status;
    if (order.refund_status) {
      badgeClass = 'refund-requested';
      badgeLabel = 'Refund Requested';
    }

    // Report Wrong Product visibility check
    // Shown ONLY on 'Delivered' / 'Collected' orders when refund_status is null
    const showRefundBtn = (order.order_status === 'Delivered' || order.order_status === 'Collected') && !order.refund_status;
    
    // Rating visibility check
    const showRateBtn = (order.order_status === 'Delivered' || order.order_status === 'Collected') && !order.rating;

    card.innerHTML = `
      <div class="order-card-header">
        <div class="order-meta-info">
          <h4>Order ${order.id}</h4>
          <p>Placed on ${dateStr}</p>
        </div>
        <span class="status-badge ${badgeClass}">${badgeLabel}</span>
      </div>

      <div class="order-card-body">
        <div class="order-desc-col">
          <p><strong>File:</strong> ${order.file_name}</p>
          <p><strong>Specs:</strong> ${order.paper_size} • ${order.print_color} • ${order.copies} copy(s)</p>
          <p><strong>Finishes:</strong> ${finishesText}</p>
          <p><strong>Fulfillment:</strong> ${order.fulfilment_type} (${order.delivery_address})</p>
        </div>
        <div class="order-price-col">
          <div class="price-label">Amount Paid</div>
          <div class="price-val">$${order.total_amount.toFixed(2)}</div>
        </div>
      </div>

      <div class="order-card-actions">
        <button class="btn btn-secondary btn-sm btn-track" data-id="${order.id}">Track Order</button>
        <button class="btn btn-secondary btn-sm btn-invoice" data-id="${order.id}">Download Invoice</button>
        ${showRateBtn ? `<button class="btn btn-secondary btn-sm btn-rate" data-id="${order.id}">Rate Order</button>` : ''}
        ${order.rating ? `<span style="font-size: 13px; color: var(--warning); font-weight: 600; align-self: center; margin-right: 8px;">★ ${order.rating} Rated</span>` : ''}
        ${showRefundBtn ? `<button class="btn btn-danger btn-sm btn-refund" data-id="${order.id}">Report Wrong Product</button>` : ''}
        <button class="btn btn-primary btn-sm btn-reorder" data-id="${order.id}">Reorder</button>
      </div>
    `;

    // Event hooks within loop
    card.querySelector('.btn-track').onclick = () => {
      state.activeTrackingOrderId = order.id;
      showScreen('tracking');
    };

    card.querySelector('.btn-invoice').onclick = () => {
      triggerInvoicePrint(order);
    };

    card.querySelector('.btn-reorder').onclick = () => {
      // Load specs back into cart state
      state.cart.fileName = order.file_name;
      state.cart.fileSize = 'Reordered File';
      state.cart.fileType = order.file_format;
      state.cart.image_dimensions = order.image_dimensions;
      state.cart.colorMode = order.color_mode;
      state.cart.paperSize = order.paper_size;
      state.cart.printColor = order.print_color;
      state.cart.finishOptions = [...order.finish_options];
      state.cart.copies = order.copies;
      state.cart.fulfilmentType = order.fulfilment_type;
      state.cart.deliveryAddress = order.delivery_address;
      
      // Update UI elements in Specs step
      DOM.summaryPaperVal.textContent = PAPER_SIZES[order.paper_size].name;
      DOM.summaryColorVal.textContent = order.print_color === 'Color' ? 'Full Color' : 'Black & White';
      DOM.summaryFinishesVal.textContent = order.finish_options.join(', ') || 'None';
      DOM.qtyValue.textContent = order.copies;
      
      // Highlight correct cards in Configure
      DOM.paperGrid.querySelectorAll('.paper-option').forEach(opt => {
        opt.classList.toggle('selected', opt.getAttribute('data-size') === order.paper_size);
      });
      DOM.colorToggleControl.querySelectorAll('.segment-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-color') === order.print_color);
      });
      DOM.finishesGrid.querySelectorAll('.checkbox-card').forEach(card => {
        const finish = card.getAttribute('data-finish');
        const isSel = order.finish_options.includes(finish);
        card.classList.toggle('selected', isSel);
        card.querySelector('input').checked = isSel;
      });

      // Update price and redirect
      recalculateCartPrice();
      // Setup temporary mock image metadata preview details
      DOM.filePreviewThumb.textContent = '🔄';
      DOM.metaFileName.textContent = order.file_name;
      DOM.metaFileSize.textContent = 'Reorder';
      DOM.metaFileType.textContent = order.file_format.split('/')[1]?.toUpperCase() || 'FILE';
      DOM.metaFileDimensions.textContent = `Dimensions: ${order.image_dimensions?.width || 2480} × ${order.image_dimensions?.height || 3508} px`;
      
      DOM.dropZone.style.display = 'none';
      DOM.fileMetadataContainer.style.display = 'block';

      showScreen('configure');
    };

    if (showRateBtn) {
      card.querySelector('.btn-rate').onclick = () => {
        state.activeRatingOrderId = order.id;
        resetRatingStars();
        DOM.modalRatingOverlay.classList.add('active');
      };
    }

    if (showRefundBtn) {
      card.querySelector('.btn-refund').onclick = () => {
        state.activeRefundOrderId = order.id;
        resetRefundForm();
        DOM.modalRefundOverlay.classList.add('active');
      };
    }

    DOM.ordersListContainer.appendChild(card);
  });
}

// ================= RATING MODAL CONTROLS =================

function resetRatingStars() {
  state.selectedRating = 0;
  DOM.stars.forEach(s => s.classList.remove('active'));
  DOM.txtRatingComments.value = '';
}

DOM.stars.forEach(star => {
  star.addEventListener('click', () => {
    const val = parseInt(star.getAttribute('data-rating'));
    state.selectedRating = val;
    DOM.stars.forEach((s, idx) => {
      s.classList.toggle('active', idx < val);
    });
  });
});

DOM.btnSubmitRating.addEventListener('click', () => {
  if (state.selectedRating === 0) {
    alert('Please select a star rating.');
    return;
  }

  const order = db.getOrders().find(o => o.id === state.activeRatingOrderId);
  if (order) {
    order.rating = state.selectedRating;
    order.rating_comment = DOM.txtRatingComments.value.trim();
    db.updateOrder(order);
    DOM.modalRatingOverlay.classList.remove('active');
    renderOrderHistory();
  }
});

DOM.btnCloseRating.addEventListener('click', () => DOM.modalRatingOverlay.classList.remove('active'));

// ================= REFUND / ISSUE MODAL CONTROLS =================

function resetRefundForm() {
  DOM.selectRefundReason.value = '';
  DOM.txtRefundDesc.value = '';
  DOM.refundFileInput.value = '';
  DOM.refundPreviewImgBox.style.display = 'none';
}

DOM.btnRefundUploadTrigger.addEventListener('click', () => DOM.refundFileInput.click());

DOM.refundFileInput.addEventListener('change', () => {
  const file = DOM.refundFileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      DOM.refundPreviewImgBox.src = e.target.result;
      DOM.refundPreviewImgBox.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

DOM.btnSubmitRefund.addEventListener('click', () => {
  const reason = DOM.selectRefundReason.value;
  const desc = DOM.txtRefundDesc.value.trim();

  if (!reason || !desc) {
    alert('Please select an issue category and provide description details.');
    return;
  }

  const order = db.getOrders().find(o => o.id === state.activeRefundOrderId);
  if (order) {
    order.refund_status = 'Refund Requested';
    order.refund_details = {
      reason,
      comments: desc,
      photo: DOM.refundPreviewImgBox.src || null
    };
    db.updateOrder(order);
    DOM.modalRefundOverlay.classList.remove('active');
    renderOrderHistory();
  }
});

DOM.btnCloseRefund.addEventListener('click', () => DOM.modalRefundOverlay.classList.remove('active'));

// ================= FREELANCE DIRECTORY SCREEN =================

function renderFreelancerDirectory() {
  const freelancers = db.getFreelancers();
  DOM.designerDirectoryGrid.innerHTML = '';

  freelancers.forEach(designer => {
    const card = document.createElement('div');
    card.className = 'designer-card';
    card.innerHTML = `
      <div class="designer-img-wrapper">
        <img class="designer-img" src="${designer.photo_url}" alt="${designer.name}" loading="lazy">
      </div>
      <div class="designer-info">
        <div class="designer-name">${designer.name}</div>
        <div class="designer-specialization">${designer.specialization}</div>
        <div class="designer-bio">${designer.bio}</div>
        <div class="designer-action">
          <a href="tel:${designer.phone_number.replace(/\s+/g, '')}" class="btn btn-secondary btn-call">
            📞 Call ${designer.name}
          </a>
        </div>
      </div>
    `;
    DOM.designerDirectoryGrid.appendChild(card);
  });
}

DOM.btnAdminManageFreelancers.addEventListener('click', () => showScreen('admin'));

// ================= ADMIN SIMULATOR PANEL CONTROLS =================

function renderAdminConsole() {
  renderAdminOrders();
  renderAdminFreelancers();
}

function renderAdminOrders() {
  const orders = db.getOrders();
  DOM.adminOrdersTableBody.innerHTML = '';

  if (orders.length === 0) {
    DOM.adminOrdersTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">
          No customer orders found in the database.
        </td>
      </tr>
    `;
    return;
  }

  orders.slice().reverse().forEach(order => {
    const tr = document.createElement('tr');
    
    // Status color badge class selector
    let badgeClass = order.order_status.toLowerCase().replace(' ', '-');
    let badgeLabel = order.order_status;
    if (order.refund_status) {
      badgeClass = 'refund-requested';
      badgeLabel = 'Refund Requested';
    }

    const statuses = ['Placed', 'Payment Confirmed', 'Vendor Accepted', 'Printing', 'Ready', 'Delivered', 'Collected', 'Cancelled'];
    
    const optionsHtml = statuses.map(s => `
      <option value="${s}" ${order.order_status === s ? 'selected' : ''}>${s}</option>
    `).join('');

    tr.innerHTML = `
      <td style="font-weight: 700; color: var(--primary);">${order.id}</td>
      <td>
        <strong style="font-size: 13px;">${order.file_name}</strong><br>
        <span style="font-size: 11px; color: var(--text-muted);">${order.paper_size} | ${order.copies} unit(s)</span>
      </td>
      <td style="font-size: 12px;">${order.fulfilment_type}</td>
      <td style="font-weight: 600;">$${order.total_amount.toFixed(2)}</td>
      <td>
        <span class="status-badge ${badgeClass}" id="admin-badge-${order.id}">${badgeLabel}</span>
      </td>
      <td>
        <div style="display: flex; gap: 8px; align-items: center;">
          <select class="admin-select select-status-change" data-id="${order.id}">
            ${optionsHtml}
          </select>
          ${order.refund_status ? `
            <button class="btn btn-danger btn-sm btn-admin-refund-view" data-id="${order.id}">
              Review Refund Details
            </button>
          ` : ''}
        </div>
      </td>
    `;

    // Dropdown status change trigger
    tr.querySelector('.select-status-change').onchange = (e) => {
      const newStatus = e.target.value;
      order.order_status = newStatus;
      db.updateOrder(order);
      renderAdminConsole();
      
      // If current tracking view matches updated order, refresh it
      if (state.activeTrackingOrderId === order.id && state.currentScreen === 'tracking') {
        renderTrackingScreen(order.id);
      }
    };

    if (order.refund_status) {
      tr.querySelector('.btn-admin-refund-view').onclick = () => {
        let detailsText = `Refund Details for ${order.id}\n`;
        detailsText += `Reason: ${order.refund_details.reason}\n`;
        detailsText += `Customer Notes: ${order.refund_details.comments}\n\n`;
        detailsText += `Do you want to approve this refund? This will set order status to 'Cancelled' (Refunded).`;
        
        if (confirm(detailsText)) {
          order.order_status = 'Cancelled';
          order.refund_status = null;
          db.updateOrder(order);
          renderAdminConsole();
        }
      };
    }

    DOM.adminOrdersTableBody.appendChild(tr);
  });
}

function renderAdminFreelancers() {
  const freelancers = db.getFreelancers();
  DOM.adminFreelancersTableBody.innerHTML = '';

  freelancers.forEach(fl => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <img class="admin-avatar" src="${fl.photo_url}" alt="${fl.name}">
      </td>
      <td style="font-weight: 600;">${fl.name}</td>
      <td style="color: var(--primary); font-size: 12px; font-weight: 500;">${fl.specialization}</td>
      <td>${fl.phone_number}</td>
      <td style="text-align: right;">
        <button class="btn btn-secondary btn-sm btn-edit-fl" data-id="${fl.id}" style="padding: 4px 8px; font-size: 11px;">Edit</button>
        <button class="btn btn-danger btn-sm btn-delete-fl" data-id="${fl.id}" style="padding: 4px 8px; font-size: 11px; margin-left: 4px;">Delete</button>
      </td>
    `;

    tr.querySelector('.btn-edit-fl').onclick = () => {
      openFreelancerModal(fl);
    };

    tr.querySelector('.btn-delete-fl').onclick = () => {
      if (confirm(`Delete ${fl.name}'s profile?`)) {
        db.deleteFreelancer(fl.id);
        renderAdminConsole();
      }
    };

    DOM.adminFreelancersTableBody.appendChild(tr);
  });
}

// Freelancer Profile Editor Form
DOM.btnAdminAddFreelancer.addEventListener('click', () => {
  openFreelancerModal(null);
});

function openFreelancerModal(freelancer = null) {
  if (freelancer) {
    DOM.freelancerModalTitle.textContent = 'Edit Designer Profile';
    DOM.flEditId.value = freelancer.id;
    DOM.flName.value = freelancer.name;
    DOM.flSpecialization.value = freelancer.specialization;
    DOM.flBio.value = freelancer.bio;
    DOM.flPhone.value = freelancer.phone_number;
    DOM.flPhoto.value = freelancer.photo_url;
  } else {
    DOM.freelancerModalTitle.textContent = 'Create Designer Profile';
    DOM.flEditId.value = '';
    DOM.freelancerForm.reset();
  }
  DOM.modalFreelancerOverlay.classList.add('active');
}

DOM.btnCloseFreelancer.addEventListener('click', () => {
  DOM.modalFreelancerOverlay.classList.remove('active');
});

DOM.btnSubmitFreelancer.addEventListener('click', () => {
  const name = DOM.flName.value.trim();
  const spec = DOM.flSpecialization.value.trim();
  const bio = DOM.flBio.value.trim();
  const phone = DOM.flPhone.value.trim();
  const photo = DOM.flPhoto.value.trim();

  if (!name || !spec || !bio || !phone || !photo) {
    alert('Please fill out all fields.');
    return;
  }

  const editId = DOM.flEditId.value;
  if (editId) {
    // Edit Mode
    db.updateFreelancer({ id: editId, name, specialization: spec, bio, phone_number: phone, photo_url: photo });
  } else {
    // Create Mode
    db.addFreelancer({ name, specialization: spec, bio, phone_number: phone, photo_url: photo });
  }

  DOM.modalFreelancerOverlay.classList.remove('active');
  renderAdminConsole();
  renderFreelancerDirectory(); // Refresh directory layout too
});

// Watch database updates and sync UI
window.addEventListener('db-change', () => {
  if (state.currentScreen === 'admin') {
    renderAdminConsole();
  } else if (state.currentScreen === 'history') {
    renderOrderHistory();
  } else if (state.currentScreen === 'freelancers') {
    renderFreelancerDirectory();
  } else if (state.currentScreen === 'tracking' && state.activeTrackingOrderId) {
    renderTrackingScreen(state.activeTrackingOrderId);
  }
});
