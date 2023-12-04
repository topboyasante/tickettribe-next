import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Provider } from "@/providers/Provider";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicketTribe",
  description: "Tickets & More!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <div>
          <Toaster />
        </div>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
