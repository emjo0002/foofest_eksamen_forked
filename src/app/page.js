export default function Home() {
  return (
    <section className="relative h-screen bg-custom bg-cover bg-center">
      <div className="flex flex-col justify-center items-center h-full text-white px-4 text-center">
        <h1 className="font-gajraj text-6xl md:text-9xl tracking-wider">FOOFEST</h1>
        <p className="font-genos text-2xl md:text-4xl lg:text-6xl mt-4">24 - 26 august</p>
      </div>

      <div className="absolute bottom-4 right-4 text-white text-right space-y-2 md:bottom-8 md:right-8 md:space-y-4">
        <a href="/tickets" className="block text-lg md:text-2xl lg:text-4xl font-gajraj font-bold cursor-pointer hover:underline">
          TICKETS!
        </a>
        <a href="/lineup" className="block text-lg md:text-2xl lg:text-4xl font-gajraj font-bold cursor-pointer hover:underline">
          LINE-UP
        </a>
        <a href="/artists" className="block text-lg md:text-2xl lg:text-4xl font-gajraj font-bold cursor-pointer hover:underline">
          PROGRAM
        </a>
      </div>
    </section>
  );
}
