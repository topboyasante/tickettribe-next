import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
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
