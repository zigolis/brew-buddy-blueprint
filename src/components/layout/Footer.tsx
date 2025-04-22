
import { Mail, Phone, Home, Copyright } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark-purple text-white">
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h3 className="text-2xl font-bold text-primary-foreground">BrewMaster Pro</h3>
          <p className="text-base text-muted-foreground">
            Your complete brewing management solution for crafting the perfect brew every time.
          </p>
          
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex justify-center items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>support@brewmaster.pro</span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>123 Brew Street, Craft City, BC 12345</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm">
            <Copyright className="h-4 w-4" />
            <span>{currentYear} BrewMaster Pro. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
