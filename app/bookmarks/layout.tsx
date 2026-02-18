import AppHeader from "@/core/components/custom/layout/AppHeader";
import Navbar from "@/core/features/home/components/Navbar";

export default function BookmarksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader title="Bookmarks" />
      <main className="py-6">{children}</main>
      <Navbar />
    </>
  );
}
