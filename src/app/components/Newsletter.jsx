function Newsletter() {
  return (
    <div className="max-w-md">
      <h2 className="text-black text-4xl md:text-5xl font-gajraj font-bold leading-tight tracking-tight mb-4">Newsletter Signup</h2>
      <div className="flex items-center border-b-2 border-black">
        <input type="email" placeholder="Type your Email Address" className="w-full bg-transparent text-black placeholder-black py-2 text-base md:text-lg font-genos outline-none" />
        <button className="ml-2 text-black text-3xl md:text-4xl hover:text-blue-700 transition-transform transform hover:scale-110">&rarr;</button>
      </div>
    </div>
  );
}

export default Newsletter;
