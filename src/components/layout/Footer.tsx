
import { Copyright } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-accent border-t border-border text-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center space-y-4">
          <h3 className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
            iBeer Brewing Pro
          </h3>

          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Copyright className="h-3 w-3" />
            <span>{currentYear} iBeer Brewing Pro. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
