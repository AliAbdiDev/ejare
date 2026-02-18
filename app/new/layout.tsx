import AppHeader from "@/core/components/custom/layout/AppHeader";

export default function NewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader title="ثبت آگهی" />
      <main className="py-6">{children}</main>
    </>
  );
}
