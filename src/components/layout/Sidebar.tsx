
import { Beer, Calculator, FileText, List, Package, LayoutDashboard, User, Calendar, FlaskConical } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Recipes", icon: Beer, path: "/recipes" },
  { name: "Batches", icon: FlaskConical, path: "/batches" },
  { name: "Ingredients", icon: Package, path: "/ingredients" },
  { name: "Equipment", icon: List, path: "/equipment" },
  { name: "Brewing Guide", icon: FileText, path: "/brewing-guide" },
  { name: "Cost Calculator", icon: Calculator, path: "/calculator" },
  { name: "My Account", icon: User, path: "/my-account" }
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <aside className={cn(
      "h-full flex-col bg-card/50 backdrop-blur-sm border-r border-border/50 px-3 py-6 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <nav className="space-y-2 flex-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full mb-4 justify-start"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <List className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">Toggle Menu</span>}
        </Button>
        {navItems.map((item) => {
          const isActive = item.path === "/" 
            ? location.pathname === "/" 
            : location.pathname.startsWith(item.path);
          return (
            <Link key={item.name} to={item.path}>
              <Button 
                variant={isActive ? "default" : "ghost"} 
                className={cn(
                  "w-full justify-start gap-3 font-medium transition-all duration-200",
                  isActive ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent hover:text-accent-foreground",
                  isCollapsed && "px-3"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )} />
                {!isCollapsed && item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
