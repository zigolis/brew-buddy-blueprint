
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
    <aside className="h-full w-64 flex-col bg-card/50 backdrop-blur-sm border-r border-border/50 px-3 py-6">
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link key={item.name} to={item.path}>
              <Button 
                variant={isActive ? "default" : "ghost"} 
                className={cn(
                  "w-full justify-start gap-3 font-medium transition-all duration-200",
                  isActive ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
