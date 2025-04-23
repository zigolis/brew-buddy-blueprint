
import { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
      <div className="mx-auto max-w-7xl space-y-8">
        {children}
      </div>
    </main>
  );
}
