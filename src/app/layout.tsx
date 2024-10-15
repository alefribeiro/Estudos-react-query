import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";

export const metadata: Metadata = {
  title: "Usuários",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="pt-BR">
        <body className="antialiased">{children}</body>
      </html>
    </QueryProvider>
  );
}
