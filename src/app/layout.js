import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Gajraj_One } from "next/font/google";
import { Genos } from "next/font/google";

const genos = Genos({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-genos",
});

const gajrajOne = Gajraj_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gajraj-one",
});

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <Header />
        <main>
          <div>{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
