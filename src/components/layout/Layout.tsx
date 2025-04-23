
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
        <div className="hidden md:block h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-r border-border/50">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-full">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
