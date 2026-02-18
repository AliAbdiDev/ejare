import AppHeader from "@/core/components/custom/layout/AppHeader";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader title="چت و تماس" />
      <main className="py-6">{children}</main>
    </>
  );
}
