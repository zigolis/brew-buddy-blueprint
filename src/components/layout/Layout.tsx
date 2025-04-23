
import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainContent } from "./MainContent";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Header />
      <div className="flex flex-1 w-full max-w-[1920px] mx-auto relative">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-4 left-4 z-50">
          <Button 
            variant="default" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Mobile sidebar - overlay */}
        <div 
          className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity md:hidden ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Sidebar - responsive */}
        <div 
          className={`fixed md:sticky top-14 md:top-14 h-[calc(100vh-3.5rem)] overflow-y-auto z-50 transition-transform md:transition-none border-r shadow-lg md:shadow-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <Sidebar />
        </div>
        
        <MainContent>{children}</MainContent>
      </div>
      <Footer />
    </div>
  );
}
