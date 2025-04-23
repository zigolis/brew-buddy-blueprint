
import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 w-full">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-4 left-4 z-50">
          <Button 
            variant="default" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="rounded-full shadow-lg"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Mobile sidebar - overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Sidebar - responsive */}
        <div 
          className={`fixed md:sticky top-16 md:top-16 h-[calc(100vh-4rem)] overflow-y-auto z-50 transition-transform md:transition-none border-r border-border/50 bg-background md:bg-transparent ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
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
