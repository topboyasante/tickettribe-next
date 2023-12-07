"use client";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { usePathname } from "next/navigation";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <Navbar />
      <section className="pt-[7vh]">{children}</section>
      {pathname !== "/events/create" && <Footer />}
    </>
  );
}
