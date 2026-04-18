import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AccessRouteToastListener from "@/modules/common/components/toast/access-route-toast-listener";
import { ToastProvider } from "@/modules/common/components/toast";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hexagon Risk Assessment Tool",
  description: "Safeguarding assessment dashboard for authorised professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <Suspense fallback={null}>
            <AccessRouteToastListener />
          </Suspense>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
