
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Timer as TimerIcon
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from 'sonner';

interface BrewingTimerProps {
  title: string;
  initialMinutes: number;
  onComplete?: () => void;
}

export function BrewingTimer({ title, initialMinutes, onComplete }: BrewingTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [alarmPlayed, setAlarmPlayed] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !alarmPlayed) {
      setIsRunning(false);
      setAlarmPlayed(true);
      
      // Play notification sound
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
      audio.play().catch(error => console.error('Error playing audio:', error));
      
      // Show toast notification
      toast.success(`${title} timer complete!`, {
        duration: 5000,
      });
      
      if (onComplete) {
        onComplete();
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, title, onComplete, alarmPlayed]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialMinutes * 60);
    setAlarmPlayed(false);
  };

  const progress = (timeLeft / (initialMinutes * 60)) * 100;

  return (
    <Card className={`w-full transition-shadow ${isRunning ? 'shadow-md border-primary' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TimerIcon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-muted rounded-full h-2.5 mb-4">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-1000" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center font-mono text-3xl font-bold">
          {formatTime(timeLeft)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2 pt-0">
        {!isRunning ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleStart}
            className="flex items-center gap-1"
          >
            <Play className="h-4 w-4" />
            Start
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePause}
            className="flex items-center gap-1"
          >
            <Pause className="h-4 w-4" />
            Pause
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="flex items-center gap-1"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
