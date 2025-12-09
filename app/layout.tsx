import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Serenica",
  description: "Serenica — Genomic Intelligence Platform"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
