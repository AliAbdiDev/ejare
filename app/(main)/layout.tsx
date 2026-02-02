// app/MainLayout.tsx یا app/layout.tsx
import { MainParams } from "@/core/assets/types";
import Header from "@/core/features/home/components/Header";
import Navbar from "@/core/features/home/components/Navbar";

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<MainParams>;
}>) {
  const mainParams = await params;

  return (
    <div className="container-page bg-background">
      <Header />
      <main className="py-10">
        {children}
      </main>

      <Navbar  />
    </div>
  );
}