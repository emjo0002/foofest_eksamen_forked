export default function Header() {
  return (
    <header>
        <div className="bg-red-800">
            FOOTFEST
        </div>
      <nav>
        <ul>
          <li><a href="/">Hjem</a></li>
          <li><a href="/about">Om os</a></li>
          <li><a href="/contact">Kontakt</a></li>
        </ul>
      </nav>
    </header>
  );
}