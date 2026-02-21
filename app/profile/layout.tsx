import AppHeader from "@/core/components/custom/layout/AppHeader";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader title="پروفایل" />
      <main className="h-full overflow-y-auto pt-22.25 pb-6">
        {children}
      </main>
    </>
  );
}

