import { create } from "zustand";

const useBookingStore = create((set, get) => ({
  // Initial state
  tickets: [
    { id: 1, title: "Foo-Billet", price: 799, quantity: 0 },
    { id: 2, title: "VIP-Billet", price: 1299, quantity: 0 },
  ],
  campingSelection: {
    area: null,
    tents: { twoPerson: 0, threePerson: 0 },
    greenCamping: false,
  },
  packageSelection: null,
  bookingFee: 99,

  // Beregninger
  totalTickets: () => get().tickets.reduce((sum, ticket) => sum + ticket.quantity, 0),
  totalTents: () =>
    get().campingSelection.tents.twoPerson +
    get().campingSelection.tents.threePerson,

  // Funktion til opdatering af billetmængden
  updateTicketQuantity: (id, newQuantity) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, quantity: newQuantity } : ticket
      ),
    })),

  // Helper til anbefalede telte
  calculateRecommendedTents: () => {
    const totalTickets = get().totalTickets();
    let remainingTickets = totalTickets;
    const recommendedTents = { twoPerson: 0, threePerson: 0 };

    if (remainingTickets >= 3) {
      recommendedTents.threePerson = Math.floor(remainingTickets / 3);
      remainingTickets %= 3;
    }

    if (remainingTickets > 0) {
      recommendedTents.twoPerson = Math.ceil(remainingTickets / 2);
    }

    if (totalTickets === 4) {
      recommendedTents.twoPerson = 2;
      recommendedTents.threePerson = 0;
    }

    return recommendedTents;
  },

  // Funktion til opdatering af pakkeløsning
  updatePackageSelection: (packageDetails) =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        tents: { twoPerson: 0, threePerson: 0 }, // Nulstil individuelle telte
      },
      packageSelection: packageDetails,
    })),

  removePackageSelection: () =>
    set(() => ({
      packageSelection: null,
    })),

  // Funktion til opdatering af teltmængden
  updateTentQuantity: (tentType, newQuantity) =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        tents: {
          ...state.campingSelection.tents,
          [tentType]: newQuantity,
        },
      },
    })),

  // Funktion til beregning af totalpris
  calculateTotal: () => {
    const { tickets, campingSelection, packageSelection, bookingFee } = get();

    // Billettotal
    const ticketsTotal = tickets.reduce(
      (sum, ticket) => sum + ticket.quantity * ticket.price,
      0
    );

    // Individuelle teltpriser
    const tentsTotal =
      campingSelection.tents.twoPerson * 799 +
      campingSelection.tents.threePerson * 999;

    // Pakkeløsning
    const packageTotal = packageSelection
      ? packageSelection.twoPerson * 799 + packageSelection.threePerson * 999
      : 0;

    // Green Camping-gebyr
    const greenCampingFee = campingSelection.greenCamping ? 249 : 0;

    // Total pris
    return ticketsTotal + tentsTotal + packageTotal + greenCampingFee + bookingFee;
  },
}));

export default useBookingStore;
