import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import SignedOutDiv from "@/components/SignedOutDiv";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />

          {/* Show content if user is signed in */}
          <SignedIn>{children}</SignedIn>

          {/* Redirect to /profile if user is not signed in */}
          <SignedOut>
            <div className="flex h-screen justify-center items-center w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
              <SignedOutDiv />
            </div>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
