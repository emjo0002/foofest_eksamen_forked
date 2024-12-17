import { create } from "zustand";
import { reserveSpot } from "../api/api";

const useBookingStore = create((set, get) => ({
  // Initial state
  tickets: [
    { id: 1, title: "Foo-Billet", price: 799, quantity: 0 },
    { id: 2, title: "VIP-Billet", price: 1299, quantity: 0 },
  ],

  reservationId: null,
  timer: 0,
  timerActive: false,
  timerInterval: null,
  loadingReservation: false,

  campingSelection: {
    area: null,
    tents: { twoPerson: 0, threePerson: 0, ownTent: 0 },
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

  totalTickets: () => get().tickets.reduce((sum, ticket) => sum + ticket.quantity, 0),
  totalTents: () => {
    const { twoPerson, threePerson, ownTent } = get().campingSelection.tents;
    return twoPerson + threePerson + ownTent;
  },

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
        ...tents,
      };
      const totalTents = twoPerson + threePerson + ownTent;
      const totalTickets = state.tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

      if (totalTents > totalTickets) {
        console.log("Antallet af telte må ikke overstige antallet af billetter.");
        return state;
      }

      return {
        campingSelection: {
          ...state.campingSelection,
          tents: { twoPerson, threePerson, ownTent },
        },
      };
    }),

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

  toggleGreenCamping: () =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        greenCamping: !state.campingSelection.greenCamping,
      },
    })),

  // Start Timer
  startTimer: (duration, onTimerEnd) => {
  if (get().timerActive) return; // Hvis timeren allerede kører, gør ingenting

  clearInterval(get().timerInterval); // Rens tidligere interval
  const endTime = Date.now() + duration;

  const interval = setInterval(() => {
    const remainingTime = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    set({ timer: remainingTime });

    if (remainingTime <= 0) {
      clearInterval(get().timerInterval);
      set({ timerActive: false, timer: 0 });
      if (onTimerEnd) onTimerEnd(); // Callback når timeren udløber
    }
  }, 1000);

  set({ timerInterval: interval, timerActive: true });
},

  // Stop Timer
  stopTimer: () => {
    clearInterval(get().timerInterval);
    set({ timer: 0, timerActive: false, timerInterval: null });
  },

  fetchReservation: async (onTimerEnd) => {
  const { campingSelection, totalTents } = get();
  const area = campingSelection.area;
  const amount = totalTents();

  if (!area || amount === 0) {
    console.error("Område eller antal telte mangler.");
    return null;
  }

  try {
    set({ loadingReservation: true });

    const { id, timeout } = await reserveSpot(area, amount);
    console.log("Reservation timeout:", timeout);

    set({
      reservationId: id,
      timer: Math.ceil(timeout / 1000), // Sæt timer til sekunder
      timerActive: true,
      loadingReservation: false,
    });

    get().startTimer(timeout, onTimerEnd);
    return id;
  } catch (error) {
    console.error("Fejl ved oprettelse af reservation:", error);
    set({ loadingReservation: false });
    return null;
  }
},
}));

export default useBookingStore;
