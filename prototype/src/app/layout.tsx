import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotelia — PMS de Nueva Generación",
  description: "Plataforma central hotelera: PMS + POS + CRS + ERP + CRM + Revenue",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
