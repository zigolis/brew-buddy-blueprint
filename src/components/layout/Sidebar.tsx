
import { Beer, Calculator, FileText, List, Package, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Recipes", icon: Beer, path: "/recipes" },
  { name: "Ingredients", icon: Package, path: "/ingredients" },
  { name: "Equipment", icon: List, path: "/equipment" },
  { name: "Brewing Guide", icon: FileText, path: "/brewing-guide" },
  { name: "Cost Calculator", icon: Calculator, path: "/calculator" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col bg-card border-r px-3 py-4">
      <div className="mb-8 flex items-center px-2">
        <span className="text-2xl font-bold text-brewing-amber">iBeer Brewing Pro</span>
      </div>
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link key={item.name} to={item.path}>
              <Button 
                variant={isActive ? "default" : "ghost"} 
                className={cn(
                  "w-full justify-start gap-3 font-normal",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t pt-4">
        <div className="rounded-md bg-accent p-3">
          <h4 className="font-medium text-sm">Ready to Brew?</h4>
          <p className="text-xs text-muted-foreground mt-1">Start a guided brewing session with any of your recipes.</p>
          <Button asChild className="mt-3 w-full">
            <Link to="/brewing-guide">Start Brewing</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

