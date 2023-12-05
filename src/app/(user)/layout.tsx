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
      <section className="pt-[7vh] px-5">{children}</section>
      <Footer />
    </>
  );
}
