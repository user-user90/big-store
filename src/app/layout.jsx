import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_Compenents/_Header/Navbar";
import Footer1 from "./_Compenents/_Footer/Footer1";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bigstore", // غير الاسم لاسم متجرك
  description: "Explore the best products in our store",
  icons: {
    icon: "/hat-1.avif", // سيقوم Next.js بالبحث عن هذا الملف في مجلد public
  }
};

export default function RootLayout({ children }) {
  return (
       <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="bg-[#FAFAFA]">
          <Navbar />
          {children}
          <Toaster position="top-center"  />
          <Footer1 />
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
