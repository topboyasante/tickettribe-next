import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Provider } from "@/providers/Provider";

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
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
