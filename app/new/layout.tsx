import AppHeader from "@/core/components/custom/layout/AppHeader";

export default function NewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader title="ثبت آگهی" />
      <main className="pt-22.25 pb-6">
        {children}
      </main>
    </>
  );
}
