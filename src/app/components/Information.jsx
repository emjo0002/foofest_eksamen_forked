import { useEffect, useState } from "react";
import useBookingStore from "../globalkurv/useBookingStore";
import { postSub } from "../lib/supabase";

export default function Information({ onNext, onBack, setPostedIds }) {
  const { fetchReservation, tickets } = useBookingStore();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReservation();
  }, [fetchReservation]);

 const handleContinue = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const userInfo = selectedTickets.map((ticket, index) => ({
  name: formData.get(`name-${ticket.id}-${index}`),
  lastname: formData.get(`lastname-${ticket.id}-${index}`),
  number: formData.get(`number-${ticket.id}-${index}`),
  email: formData.get(`email-${ticket.id}-${index}`),
}));

const isFormValid = userInfo.every(
  (user) => user.name && user.lastname && user.number && user.email
);

if (!isFormValid) {
  setError("All fields must be filled in correctly.");
  return;
}

  setIsLoading(true);
  setError(null);

  try {
    const ids = [];
    for (const user of userInfo) {
      const newSubscriber = await postSub(user);
      if (newSubscriber && newSubscriber.length > 0) {
        ids.push(newSubscriber[0].id);
      }
    }
    setPostedIds(ids);
    onNext();
  } catch (error) {
    console.error("Error saving data:", error.message);
    setError("There was an error saving the data.");
  } finally {
    setIsLoading(false);
  }
};

  const selectedTickets = tickets.flatMap((ticket) =>
    Array(ticket.quantity).fill(ticket)
  );

  return (
    <main className="flex items-center justify-center px-8">
      <form
        onSubmit={handleContinue}
        className="flex flex-col justify-center items-center gap-6 w-full"
      >
        <div className="flex flex-col gap-8 justify-center w-full max-w-lg font-genos mt-10">
          {selectedTickets.map((ticket, index) => (
  <div key={`${ticket.id}-${index}`} className="border border-white text-white p-6">
    <h2 className="text-2xl font-bold mb-4 text-center">
      Info Form - {ticket.title} #{index + 1}
    </h2>

    <div className="mb-4">
      <label htmlFor={`name-${ticket.id}-${index}`} className="block font-medium mb-2 text-white">
        Name:
      </label>
      <input
        type="text"
        name={`name-${ticket.id}-${index}`}
        id={`name-${ticket.id}-${index}`}
        className="w-full px-3 py-2 border border-gray-300 text-black"
        placeholder="Name"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor={`lastname-${ticket.id}-${index}`} className="block font-medium mb-2 text-white">
        Last name:
      </label>
      <input
        type="text"
        name={`lastname-${ticket.id}-${index}`}
        id={`lastname-${ticket.id}-${index}`}
        className="w-full px-3 py-2 border border-gray-300 text-black"
        placeholder="Last name"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor={`number-${ticket.id}-${index}`} className="block font-medium mb-2 text-white">
        Telephone number:
      </label>
      <input
        type="text"
        name={`number-${ticket.id}-${index}`}
        id={`number-${ticket.id}-${index}`}
        className="w-full px-3 py-2 border border-gray-300 text-black"
        placeholder="Phone number"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor={`email-${ticket.id}-${index}`} className="block font-medium mb-2 text-white">
        E-mail:
      </label>
      <input
        type="email"
        name={`email-${ticket.id}-${index}`}
        id={`email-${ticket.id}-${index}`}
        className="w-full px-3 py-2 border border-gray-300 text-black"
        placeholder="E-mail"
        required
      />
    </div>
  </div>
))}

        </div>

        <div className="flex justify-between w-full lg:max-w-6xl lgmx-auto">
          <button
            type="button"
            onClick={onBack}
            className="font-gajraj px-4 py-2 text-3xl text-white lg:text-4xl"
          >
            Back
          </button>
          {error && (
            <p className="font-genos text-2xl text-red-500 text-center lg:px-20">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="font-gajraj px-4 py-2 text-3xl text-white pb-5 lg:text-4xl"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </main>
  );
}
