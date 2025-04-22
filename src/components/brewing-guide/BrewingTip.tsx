
import { Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface BrewingTipProps {
  title: string;
  children: React.ReactNode;
}

export function BrewingTip({ title, children }: BrewingTipProps) {
  return (
    <Card className="border-amber-300 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-amber-200 dark:bg-amber-800 rounded-full p-2 mt-0.5">
            <Info className="h-4 w-4 text-amber-700 dark:text-amber-200" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-800 dark:text-amber-200">{title}</h4>
            <div className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              {children}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
