function Newsletter() {
  return (
    <div className="max-w-md mx-auto p-4">
      {/* <h2 className="text-center text-black font-bold mb-4">Tilmeld dig vores nyhedsbrev og vær de første til at modtage nyheder om nye kollektioner og eksklusive tilbud!</h2> */}
      <div className="flex border-2 border-black">
        <input type="email" placeholder="Tilmeld dig vores nyhedsbrev.." className="w-3/4 px-4 py-2 text-black text-lg outline-none" />
        <button className="w-1/4 bg-slate-900 text-white text-lg">SIGN UP</button>
      </div>
      {/* <p className="mt-4 text-black text-sm text-center">Ved at tilmelde dig giver du samtykke til, at Foofestival sender dig nyhedsbreve. Vi deler aldrig dine oplysninger med tredjeparter. Du kan til enhver tid afmelde dig via linket i vores e-mails.</p> */}
    </div>
  );
}

export default Newsletter;
