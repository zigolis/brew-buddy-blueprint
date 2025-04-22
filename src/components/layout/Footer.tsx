
import { Copyright } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark-purple text-white">
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h3 className="text-2xl font-bold text-white/90 hover:text-white transition-colors">BrewMaster Pro</h3>
          <p className="text-base text-gray-300">
            Your complete brewing management solution for crafting the perfect brew every time.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Copyright className="h-4 w-4" />
            <span>{currentYear} BrewMaster Pro. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
