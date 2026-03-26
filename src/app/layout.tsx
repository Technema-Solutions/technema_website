import type { Metadata } from "next";
import { Poppins, Fira_Sans } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Solusi Teknologi Inovatif`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/logo_technema.svg",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Solusi Teknologi Inovatif`,
    description: SITE_DESCRIPTION,
  },
  verification: {
    google: "PfJekubYV8bfRg_TVXH0YI1tDQhnB_FEoLUjcaPhjJg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${firaSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
