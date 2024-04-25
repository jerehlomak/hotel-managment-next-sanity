import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { Header, Footer } from "../components";
import ThemeProvider from "../components/ThemeProvider/ThemeProvider";
import { NextAuthProvider } from "../components/AuthProvider/AuthProvider";
import Toast from "../components/Toast/Toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Hotel Management App",
  description: "Discover The Best Hotel Rooms",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        <NextAuthProvider>
          <ThemeProvider>
            <Toast />
            <main className="font-normal">
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
