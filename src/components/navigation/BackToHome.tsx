
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function BackToHome() {
  return (
    <Button variant="ghost" asChild className="mb-4">
      <Link to="/" className="flex items-center gap-2">
        <ChevronLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </Button>
  );
}
