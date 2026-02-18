import AppHeader from "@/core/components/custom/layout/AppHeader";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader title="پروفایل" />
      <main className="py-6">{children}</main>
    </>
  );
}
