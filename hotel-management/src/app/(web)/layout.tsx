import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import { NextAuthProvider } from "@/components/AuthProvider/AuthProvider";
import Toast from "@/components/Toast/Toast";
import { CartProvider } from '@/context/CartContext';

const poppins = Poppins({ subsets: ["latin"], 
      weight: ["400", "500", "700", "900"], 
      style: ["italic", "normal"], 
      variable: "--fon-poppins" });

export const metadata: Metadata = {
            title: "Hotel Management App",
            description: "Discover the best hotel rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
          crossOrigin='anonymous'
        />
      </head>
      <body className={poppins.className}>
        <NextAuthProvider>
        <ThemeProvider>
          <Toast/>
            <main className="font-normal">
              <CartProvider>
                <Header />
                {children}
                <Footer />
              </CartProvider>
            </main>
        </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
