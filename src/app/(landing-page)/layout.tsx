import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/homepage/Navbar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
