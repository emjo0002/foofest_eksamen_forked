import { create } from "zustand";

const useBookingStore = create((set, get) => ({
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

  // Initial state for package selection
  packageSelection: null, // Holder den anbefalede pakkeløsning (null hvis ingen pakke er valgt)

  bookingFee: 99,

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

  // Funktion til at slå Green Camping til/fra
  toggleGreenCamping: () =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        greenCamping: !state.campingSelection.greenCamping,
      },
    })),

  // Funktion til at opdatere pakkeløsningen
  updatePackageSelection: (packageDetails) =>
    set(() => ({
      packageSelection: packageDetails,
    })),

  // Funktion til at fjerne pakkeløsningen
  removePackageSelection: () =>
    set(() => ({
      packageSelection: null,
    })),

  // Selector til at tjekke, om der er billetter eller telte i kurven
  hasItemsInCart: () => {
    const { tickets, campingSelection, packageSelection } = get();
    const ticketsInCart = tickets.some((ticket) => ticket.quantity > 0);
    const tentsInCart = campingSelection.tents.twoPerson > 0 || campingSelection.tents.threePerson > 0;
    const packageInCart = packageSelection !== null;
    return ticketsInCart || tentsInCart || packageInCart;
  },

  // Funktion til at beregne totalpris
  calculateTotal: () => {
    const { tickets, campingSelection, packageSelection, bookingFee } = get();
    const ticketsTotal = tickets.reduce((sum, ticket) => sum + ticket.quantity * ticket.price, 0);
    const tentsTotal =
      campingSelection.tents.twoPerson * 799 + campingSelection.tents.threePerson * 999;
    const packageTotal =
      packageSelection
        ? packageSelection.twoPerson * 799 + packageSelection.threePerson * 999
        : 0;
    return ticketsTotal + tentsTotal + packageTotal + bookingFee;
  },
}));

export default useBookingStore;
