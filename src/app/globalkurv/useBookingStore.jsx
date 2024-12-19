import { create } from "zustand";
import { reserveSpot } from "../api/api";

const useBookingStore = create((set, get) => ({
  // Initial state
  tickets: [
    { id: 1, title: "Foo-Billet", price: 799, quantity: 0, bio: "Få adgang til alle scener, koncerter og fællesområder. Nyd musik, madboder og aktiviteter i en livlig festivalstemning." },
    { id: 2, title: "VIP-Billet", price: 1299, quantity: 0, bio: "Opgrader til VIP med eksklusive områder, bedre udsyn, loungefaciliteter, private barer, VIP-toiletter og en lækker goodiebag." },
  ],
  reservationId: null,
  campingSelection: {
    area: null,
    tents: { twoPerson: 0, threePerson: 0, ownTent: 0 },
    greenCamping: false,
  },
  packageSelection: null,
  bookingFee: 99,
  userInfo: [],

  updateUserInfo: (newUser) =>
    set((state) => ({
      userInfo: [...state.userInfo, newUser],
    })),

  calculateTotal: () => {
    const { tickets, campingSelection, packageSelection, bookingFee } = get();

    const ticketsTotal = tickets.reduce((sum, ticket) => sum + ticket.quantity * ticket.price, 0);

    const tentsTotal = campingSelection.tents.twoPerson * 799 + campingSelection.tents.threePerson * 999;

    const packageTotal = packageSelection ? packageSelection.twoPerson * 799 + packageSelection.threePerson * 999 : 0;

    const greenCampingFee = campingSelection.greenCamping ? 249 : 0;

    return ticketsTotal + tentsTotal + packageTotal + greenCampingFee + bookingFee;
  },

  // Funktion til at opdatere billetantal
  updateTicketQuantity: (id, newQuantity) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) => (ticket.id === id ? { ...ticket, quantity: Math.max(0, newQuantity) } : ticket)),
    })),

  // Beregner det samlede antal billetter
  totalTickets: () => get().tickets.reduce((sum, ticket) => sum + ticket.quantity, 0),

  // Beregner det samlede antal telte
  totalTents: () => {
    const { twoPerson, threePerson, ownTent } = get().campingSelection.tents;
    return twoPerson + threePerson + ownTent;
  },

  // Beregner anbefalede telte baseret på antal billetter
  calculateRecommendedTents: () => {
    const totalTickets = get().totalTickets();
    return {
      twoPerson: totalTickets % 3 === 1 ? 1 : Math.ceil((totalTickets % 3) / 2),
      threePerson: Math.floor(totalTickets / 3),
    };
  },

 updateTents: (tents) =>
  set((state) => {
    const { twoPerson, threePerson, ownTent = 0 } = { 
      ...state.campingSelection.tents, 
      ...tents 
    };
    const totalTents = twoPerson + threePerson + ownTent;
    const totalTickets = state.tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

      // Hvis totalTents overstiger totalTickets, forhindre opdatering
      if (totalTents > totalTickets) {
        console.log("Antallet af telte må ikke overstige antallet af billetter.");
        return state; // Returner nuværende state uden ændringer
      }

      // Ellers opdater state
      return {
        campingSelection: {
          ...state.campingSelection,
          tents: { twoPerson, threePerson, ownTent },
        },
      };
    }),

  // Funktion til at opdatere campingområde
  updateCampingArea: (area) =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        area,
      },
    })),

  // Funktion til at fjerne pakkeløsning
  removePackageSelection: () =>
    set(() => ({
      packageSelection: null,
    })),

  // Funktion til at toggle Green Camping
  toggleGreenCamping: () =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        greenCamping: !state.campingSelection.greenCamping,
      },
    })),

  // Funktion til at hente reservation
  fetchReservation: async () => {
    try {
      const { area } = get().campingSelection;
      const totalTents = get().totalTents();
      const response = await reserveSpot(area, totalTents);
      console.log("Server response:", response);
      set({ reservationId: response.id });
    } catch (error) {
      console.error("Failed to fetch reservation:", error);
    }
  },
}));

export default useBookingStore;
