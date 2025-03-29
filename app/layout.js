'use client'
import localFont from "next/font/local";
import {Roboto} from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'

import "./globals.css";
import Header from "./_component/Header";
import Footer from "./_component/Footer";
import { CartContext } from "./_context/CartContext";
import { useState } from "react";

const geistSans = Roboto({
  subsets: ["latin"],
  variable: "--font-Roboto",
  weight: "700",
});


// export const metadata = {
//   title: "educational courses",
//   description: "Generated by create next app",
// };





export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  return (
    <ClerkProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <html lang="en">
          <body className={`${geistSans.variable} antialiased`}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </CartContext.Provider>
    </ClerkProvider>
  );
}