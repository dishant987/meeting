import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import MainHeader from "@/components/header/MainHeader";
import { Toaster } from "react-hot-toast";
import CreateEventDrawer from "@/components/create-event";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scheduler Meeting",
  description: " Scheduler Meeting App ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-right" reverseOrder={false} />
            <MainHeader />
            <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100  dark:from-gray-900 dark:to-gray-900">
              {children}
            </main>
            <Footer />
            <CreateEventDrawer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
