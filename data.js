// Database & LocalStorage Synchronization layer

const DEFAULT_FREELANCERS = [
  {
    id: "FL-1",
    name: "Sarah Jenkins",
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
    specialization: "Logo Design, Brand Identity",
    bio: "Award-winning graphic designer with 6+ years of experience helping brands stand out. Specializes in typography, corporate identity, and custom illustrations.",
    phone_number: "+1 555-0143"
  },
  {
    id: "FL-2",
    name: "David Chen",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    specialization: "Poster Layouts, Print Production",
    bio: "Obsessed with print layouts, grid systems, and typography. Works closely with local printing presses to deliver pixel-perfect brochures, posters, and books.",
    phone_number: "+1 555-0182"
  },
  {
    id: "FL-3",
    name: "Elena Rostova",
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    specialization: "Vector Illustration, Package Design",
    bio: "Digital illustrator and packaging designer. Converts complex visual ideas into clean, printable vector files. Loves bright colors and bold textures.",
    phone_number: "+1 555-0199"
  },
  {
    id: "FL-4",
    name: "Marcus Miller",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    specialization: "Editorial Design, Magazine Layouts",
    bio: "Freelance art director focusing on editorial publication design, catalogs, and high-end print portfolios. Passionate about minimalism and white space.",
    phone_number: "+1 555-0121"
  }
];

const DEFAULT_ADDRESSES = [
  "456 Editorial Way, Suite 10, Design District, NY 10013",
  "789 Typography Ave, Brooklyn, NY 11211"
];

// Helper to check and initialize store
function initStore() {
  if (!localStorage.getItem("print_app_freelancers")) {
    localStorage.setItem("print_app_freelancers", JSON.stringify(DEFAULT_FREELANCERS));
  }
  if (!localStorage.getItem("print_app_orders")) {
    localStorage.setItem("print_app_orders", JSON.stringify([]));
  }
  if (!localStorage.getItem("print_app_addresses")) {
    localStorage.setItem("print_app_addresses", JSON.stringify(DEFAULT_ADDRESSES));
  }
}

// Initialise right away
initStore();

const db = {
  // Freelancer Operations
  getFreelancers() {
    return JSON.parse(localStorage.getItem("print_app_freelancers") || "[]");
  },
  saveFreelancers(freelancers) {
    localStorage.setItem("print_app_freelancers", JSON.stringify(freelancers));
    window.dispatchEvent(new Event("db-change"));
  },
  addFreelancer(freelancer) {
    const freelancers = this.getFreelancers();
    const newFreelancer = {
      ...freelancer,
      id: "FL-" + Date.now()
    };
    freelancers.push(newFreelancer);
    this.saveFreelancers(freelancers);
    return newFreelancer;
  },
  updateFreelancer(updated) {
    let freelancers = this.getFreelancers();
    freelancers = freelancers.map(fl => fl.id === updated.id ? updated : fl);
    this.saveFreelancers(freelancers);
  },
  deleteFreelancer(id) {
    let freelancers = this.getFreelancers();
    freelancers = freelancers.filter(fl => fl.id !== id);
    this.saveFreelancers(freelancers);
  },

  // Order Operations
  getOrders() {
    return JSON.parse(localStorage.getItem("print_app_orders") || "[]");
  },
  saveOrders(orders) {
    localStorage.setItem("print_app_orders", JSON.stringify(orders));
    window.dispatchEvent(new Event("db-change"));
  },
  addOrder(order) {
    const orders = this.getOrders();
    const newOrder = {
      ...order,
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      timestamps: {
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    };
    orders.push(newOrder);
    this.saveOrders(orders);
    return newOrder;
  },
  updateOrder(updated) {
    let orders = this.getOrders();
    orders = orders.map(ord => {
      if (ord.id === updated.id) {
        // Auto-compute cancellation_eligible from state
        // Cancel is allowed up to and including 'Vendor Accepted'
        const cancellableStates = ["Placed", "Payment Confirmed", "Vendor Accepted"];
        const cancellation_eligible = cancellableStates.includes(updated.order_status);
        
        return {
          ...updated,
          cancellation_eligible,
          timestamps: {
            ...updated.timestamps,
            updated_at: new Date().toISOString()
          }
        };
      }
      return ord;
    });
    this.saveOrders(orders);
  },

  // Address Operations
  getAddresses() {
    return JSON.parse(localStorage.getItem("print_app_addresses") || "[]");
  },
  addAddress(address) {
    const addresses = this.getAddresses();
    if (address && !addresses.includes(address)) {
      addresses.push(address);
      localStorage.setItem("print_app_addresses", JSON.stringify(addresses));
      window.dispatchEvent(new Event("db-change"));
    }
  },
  deleteAddress(address) {
    let addresses = this.getAddresses();
    addresses = addresses.filter(addr => addr !== address);
    localStorage.setItem("print_app_addresses", JSON.stringify(addresses));
    window.dispatchEvent(new Event("db-change"));
  },

  // User Session Operations
  getCurrentUser() {
    return localStorage.getItem("print_app_user");
  },
  setCurrentUser(phone) {
    localStorage.setItem("print_app_user", phone);
    window.dispatchEvent(new Event("auth-change"));
  },
  logout() {
    localStorage.removeItem("print_app_user");
    window.dispatchEvent(new Event("auth-change"));
  }
};
