
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 w-full">
        <div className="hidden md:block h-screen sticky top-0 overflow-y-auto">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
