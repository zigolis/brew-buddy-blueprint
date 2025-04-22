
import { Mail, Phone, Home, Copyright } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">BrewMaster Pro</h3>
            <p className="text-sm text-muted-foreground">
              Your complete brewing management solution for crafting the perfect brew every time.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Copyright className="h-4 w-4" />
              <span>{currentYear} BrewMaster Pro. All rights reserved.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/recipes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Recipes
              </Link>
              <Link to="/ingredients" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Ingredients
              </Link>
              <Link to="/equipment" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Equipment
              </Link>
              <Link to="/brewing-guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Brewing Guide
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@brewmaster.pro</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Home className="h-4 w-4" />
                <span>123 Brew Street, Craft City, BC 12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
