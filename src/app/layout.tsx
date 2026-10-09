import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const certia = localFont({
  variable: "--font-certia",
  src: [
    { path: "../fonts/Certia-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Certia-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Certia-SemiBold.otf", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "IST Legal | AI-Powered Legal Research Platform",
  description:
    "Conduct faster, jurisdiction-specific legal research with trusted AI built for lawyers, law firms, businesses, government institutions, and students. Start free.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${certia.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-white px-2xl py-lg text-md font-medium text-bg-dark focus:not-sr-only focus:fixed focus:left-2xl focus:top-2xl"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
