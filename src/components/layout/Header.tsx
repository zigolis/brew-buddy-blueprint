import { useState } from "react";
import { Link } from "react-router-dom";
import { Beer, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="md:hidden mr-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="h-full overflow-auto">
                <Sidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Beer className="h-6 w-6 text-primary" />
            <span className="hidden md:inline-block font-bold text-xl">iBeer Brewing Pro</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild size="sm">
            <Link to="/brewing-guide">Start Brewing</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
