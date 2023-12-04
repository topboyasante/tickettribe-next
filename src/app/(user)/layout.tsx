import Footer from "@/components/homepage/Footer";
import AuthNavbar from "@/components/navigation/AuthNavbar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNavbar />
      <section className="pt-[7vh] px-5">{children}</section>
      <Footer />
    </>
  );
}
