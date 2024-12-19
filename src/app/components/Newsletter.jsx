function Newsletter() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-white text-5xl md:text-6xl font-gajraj font-bold leading-tight tracking-tight mb-6">Newsletter Signup</h2>
      <div className="flex items-center border-b-2 border-white">
        <input type="email" placeholder="Your Email Address" className="w-full bg-transparent text-white placeholder-white py-2 text-lg font-genos outline-none" />
        <button className="ml-4 text-white text-4xl hover:text-blue-700 transition-transform transform hover:scale-110">&rarr;</button>
      </div>
    </div>
  );
}

export default Newsletter;
