
import { Copyright } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark-charcoal text-white">
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl font-bold text-primary-foreground">BrewMaster Pro</h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Your complete brewing management solution for crafting the perfect brew every time. 
            We're passionate about helping brewers of all levels create exceptional craft beers with ease.
          </p>
          <div className="flex justify-center items-center space-x-2 text-sm text-white/70">
            <Copyright className="h-4 w-4" />
            <span>{currentYear} BrewMaster Pro. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
