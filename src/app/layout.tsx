import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Importação dos estilos globais do Tailwind

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfólio | Willian F. B. Santos",
  description: "Portfólio de Willian Barata, Engenheiro de Software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
