import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <Header />
        <main className="pb-10">
          <div>{children}</div>
        </main>
        <Footer/>
      </body>
    </html>
  );
}
