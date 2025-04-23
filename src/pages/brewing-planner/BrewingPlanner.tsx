
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useBrewContext } from "@/contexts/BrewContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Plus, PlusCircle, Trash2 } from "lucide-react";
import { Recipe } from "@/types";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface BrewingSession {
  id: string;
  recipeId: string;
  date: Date;
  notes?: string;
}

const BrewingPlanner = () => {
  const { recipes } = useBrewContext();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [brewingSessions, setBrewingSessions] = useState<BrewingSession[]>(() => {
    const saved = localStorage.getItem("brewMasterPlanner");
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("brewMasterPlanner", JSON.stringify(brewingSessions));
  }, [brewingSessions]);
  
  const handleAddSession = () => {
    if (!selectedRecipeId || !selectedDate) {
      toast.error("Please select both a recipe and date");
      return;
    }
    
    const newSession = {
      id: crypto.randomUUID(),
      recipeId: selectedRecipeId,
      date: selectedDate
    };
    
    setBrewingSessions(prev => [...prev, newSession]);
    toast.success("Brewing session added to your planner");
    setSelectedRecipeId("");
    setSelectedDate(new Date());
  };
  
  const handleRemoveSession = (id: string) => {
    setBrewingSessions(prev => prev.filter(session => session.id !== id));
    toast.success("Brewing session removed");
  };
  
  const sortedSessions = [...brewingSessions].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Brewing Planner</h1>
            <p className="text-muted-foreground">Plan your upcoming brewing sessions</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Brewing Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Plan a Brewing Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Recipe</label>
                  <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a recipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipes.map(recipe => (
                        <SelectItem key={recipe.id} value={recipe.id}>{recipe.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddSession}>Add to Planner</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-4">
          {sortedSessions.length > 0 ? (
            sortedSessions.map(session => {
              const recipe = getRecipeById(session.recipeId);
              if (!recipe) return null;
              
              return (
                <Card key={session.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{recipe.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {format(new Date(session.date), "PPP")}
                        </Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveSession(session.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><span className="font-medium">Style:</span> {recipe.style?.name || 'N/A'}</p>
                      <p><span className="font-medium">Estimated Time:</span> {recipe.boilTime + 120} minutes</p>
                      <div className="flex justify-end space-x-2 mt-2">
                        <Link to={`/recipes/${recipe.id}`}>
                          <Button variant="outline" size="sm">View Recipe</Button>
                        </Link>
                        <Link to={`/brewing-guide/${recipe.id}`}>
                          <Button size="sm">Start Brewing</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No Brewing Sessions Planned</h3>
              <p className="mb-6 text-muted-foreground">
                Add your first brewing session by clicking the button above
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BrewingPlanner;
