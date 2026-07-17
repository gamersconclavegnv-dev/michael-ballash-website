import { Syne, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata = {
  title: "Michael Ballash — Private Chef & Artist, Miami",
  description:
    "Michael Ballash is a Miami chef working in Michelin-starred kitchens, now taking private chef clients and selling his paintings for the first time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${sourceSerif.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
