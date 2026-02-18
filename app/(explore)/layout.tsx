import Header from "@/core/features/home/components/Header";
import Navbar from "@/core/features/home/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header />
      <main className="py-10">
        {children}
      </main>

      <Navbar />
    </>
  );
}