import Header from "./components/Header";
import { Gajraj_One } from "next/font/google";

const gajrajOne = Gajraj_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gajraj-one",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>{children}</main>
      </body>
    </html>
  );
}
