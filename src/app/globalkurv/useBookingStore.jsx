import { create } from "zustand";
import { reserveSpot } from "../api/api";

const useBookingStore = create((set, get) => ({
  // Initial state
  tickets: [
    { id: 1, title: "Foo-Billet", price: 799, quantity: 0 },
    { id: 2, title: "VIP-Billet", price: 1299, quantity: 0 },
  ],
  reservationId: null,
  campingSelection: {
    area: null,
    tents: { twoPerson: 0, threePerson: 0 },
    greenCamping: false,
  },
  packageSelection: null,
  bookingFee: 99,

  // Beregn totalpris
  calculateTotal: () => {
    const { tickets, campingSelection, packageSelection, bookingFee } = get();

    const ticketsTotal = tickets.reduce(
      (sum, ticket) => sum + ticket.quantity * ticket.price,
      0
    );

    const tentsTotal =
      campingSelection.tents.twoPerson * 799 +
      campingSelection.tents.threePerson * 999;

    const packageTotal = packageSelection
      ? packageSelection.twoPerson * 799 + packageSelection.threePerson * 999
      : 0;

    const greenCampingFee = campingSelection.greenCamping ? 249 : 0;

    return ticketsTotal + tentsTotal + packageTotal + greenCampingFee + bookingFee;
  },

  updateTicketQuantity: (id, newQuantity) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, quantity: Math.max(0, newQuantity) } : ticket
      ),
    })),

  // Resten af funktionerne
  totalTickets: () => get().tickets.reduce((sum, ticket) => sum + ticket.quantity, 0),
  totalTents: () => {
    const { twoPerson, threePerson } = get().campingSelection.tents;
    return twoPerson + threePerson;
  },

  calculateRecommendedTents: () => {
    const totalTickets = get().totalTickets();
    return {
      twoPerson: totalTickets % 3 === 1 ? 1 : Math.ceil((totalTickets % 3) / 2),
      threePerson: Math.floor(totalTickets / 3),
    };
  },

  updateTents: (tents) =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        tents: { ...tents },
      },
    })),

  updateCampingArea: (area) =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        area,
      },
    })),

  removePackageSelection: () =>
    set(() => ({
      packageSelection: null,
    })),

  fetchReservation: async () => {
  try {
    const { area } = get().campingSelection;
    const totalTents = get().totalTents();
    const response = await reserveSpot(area, totalTents);
    console.log("Server response:", response); // Log response fra serveren
    set({ reservationId: response.id });
  } catch (error) {
    console.error("Failed to fetch reservation:", error);
  }
},
}));

export default useBookingStore;