import { create } from "zustand";

const useBookingStore = create((set) => ({
  // Initial state for tickets
  tickets: [
    { id: 1, title: "Foo-Billet", price: 799, quantity: 0 },
    { id: 2, title: "VIP-Billet", price: 1299, quantity: 0 },
  ],

  // Initial state for camping selection
  campingSelection: {
    area: null,
    tents: { twoPerson: 0, threePerson: 0 },
    greenCamping: false,
  },

  // Funktion til at opdatere billetmængden
  updateTicketQuantity: (id, newQuantity) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) => (ticket.id === id ? { ...ticket, quantity: newQuantity } : ticket)),
    })),

  // Funktion til at opdatere teltmængden
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

  toggleGreenCamping: () =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        greenCamping: !state.campingSelection.greenCamping,
      },
    })),
}));

export default useBookingStore;
