
import { Copyright } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark-purple text-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center space-y-4">
          <h3 className="text-xl font-semibold text-brewing-amber hover:text-brewing-amber/80 transition-colors">
            BrewMaster Pro
          </h3>

          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
            <Copyright className="h-3 w-3" />
            <span>{currentYear} BrewMaster Pro. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
