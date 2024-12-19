function Newsletter() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-white text-3xl font-bold font-genos mb-4">NYHEDSBREV</h2>
      <div className="flex items-center border-b-2 border-white">
        <input type="email" placeholder="Skriv din E-mail her" className="w-full bg-transparent text-white placeholder-white py-2 text-lg font-genos outline-none" />
        <button className="ml-2 text-white text-2xl">&rarr;</button>
      </div>
    </div>
  );
}

export default Newsletter;
