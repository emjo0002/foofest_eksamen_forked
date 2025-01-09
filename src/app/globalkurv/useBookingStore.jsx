import { create } from "zustand";
import { reserveSpot, fullfillReservation } from "../api/api";

const initialTickets = [
  { id: 1, title: "Foo-Ticket", price: 799, quantity: 0, bio: "Get access to all stages, concerts and common areas. Enjoy music, food stalls and activities in a lively festival atmosphere." },
  { id: 2, title: "VIP-Ticket", price: 1299, quantity: 0, bio: "Upgrade to VIP with exclusive areas, better views, lounge facilities, private bars, VIP toilets and a delicious goodie bag." },
];

const initialCampingSelection = {
  area: null,
  tents: { twoPerson: 0, threePerson: 0, ownTent: 0 },
  greenCamping: false,
};

const useBookingStore = create((set, get) => ({
  // Initial state
  tickets: [...initialTickets],
  campingSelection: { ...initialCampingSelection },
  reservationId: null,
  packageSelection: null,
  bookingFee: 99,
  userInfo: [],
  timer: 0,
  timerActive: false,

  // Nulstil bookingdata
  resetBooking: () =>
    set({
      tickets: [...initialTickets],
      campingSelection: { ...initialCampingSelection },
      packageSelection: null,
      reservationId: null,
      timer: 0,
      timerActive: false,
    }),

  resetReservationId: () => set({ reservationId: null }),

  // Stop timeren
  stopTimer: () =>
  set((state) => ({
    timer: 0, 
    timerActive: false,
  })),

  resetUserInfo: () => set({ userInfo: [] }),

  // Funktion til at hente reservation og start timer
  fetchReservation: async () => {
    try {
      const { reservationId, campingSelection, totalTents } = get();

      // Hvis et reservations-ID allerede findes, returner det direkte
      if (reservationId) {
        console.log("Existing reservation found:", reservationId);
        return reservationId;
      }

      const { area } = campingSelection;
      const tentsCount = totalTents();

      // Hvis der ikke er et område valgt, eller ingen telte er angivet
      if (!area || tentsCount === 0) {
        console.error("Cannot fetch reservation: area or tents not specified");
        return null;
      }

      // Lav en ny reservation via API'et
      const { id, timeout } = await reserveSpot(area, tentsCount);
      set({
        reservationId: id,
        timer: timeout / 1000, // Konverter timeout til sekunder
        timerActive: true,
      });

      console.log("New reservation created:", id);
      return id;
    } catch (error) {
      console.error("Failed to fetch reservation:", error);
      return null;
    }
  },

  decrementTimer: () =>
  set((state) => {
    if (state.timer > 0) {
      return { timer: state.timer - 1 };
    } else {
      return { timer: 0, timerActive: false };
    }
  }),

  completeReservation: async () => {
    const { reservationId } = get();
    if (!reservationId) {
      console.error("Ingen reservations-ID fundet.");
      return null;
    }

    try {
      const response = await fullfillReservation(reservationId);
      set({ reservationId: response.id || reservationId });
      set({ timer: 0, timerActive: false });
      return response;
    } catch (error) {
      console.error("Fejl ved fuldførelse af reservation:", error);
      return null;
    }
  },

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
      const {
        twoPerson,
        threePerson,
        ownTent = 0,
      } = {
        ...state.campingSelection.tents,
        ...tents,
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
}));

export default useBookingStore;
