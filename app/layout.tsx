import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/core/components/ui/sonner";

const iranSansBold = localFont({
  src: "./fonts/woff/IRANYekanX-Bold.woff",
  variable: "--font-iransans-bold",
  weight: "700",
  display: "swap",
});

const iranSansMedium = localFont({
  src: "./fonts/woff/IRANYekanX-Medium.woff",
  variable: "--font-iransans-medium",
  weight: "500",
  display: "swap",
});

const iranSansThin = localFont({
  src: "./fonts/woff/IRANYekanX-Thin.woff",
  variable: "--font-iransans-thin",
  weight: "300",
  display: "swap",
});
const iranSansLight = localFont({
  src: "./fonts/woff/IRANYekanX-Light.woff",
  variable: "--font-iransans-light",
  weight: "300",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "اپلیکیشن با ایران‌سنس",
//   description: "فونت ایران‌سنس با متغیرهای CSS",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`
          ${iranSansBold.variable}
          ${iranSansMedium.variable}
          ${iranSansThin.variable}
          ${iranSansLight.variable}
          antialiased bg-accent
        `}
      >
         {children}
          <Toaster richColors />
      </body>
    </html>
  );
}