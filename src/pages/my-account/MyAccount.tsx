
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/contexts/SettingsContext";
import { useTheme } from "@/hooks/use-theme";
import { Currency, Thermometer, Moon, Sun } from "lucide-react";

const currencies = ["USD", "CAD", "GBP", "AUD", "EUR"];
const measurementSystems = ["Metric", "Imperial"];

const MyAccount = () => {
  const [userData, setUserData] = useState({
    name: "Homebrewer",
    email: "brewer@example.com",
    brewingExperience: "Intermediate"
  });
  const { settings, updateSettings } = useSettings();
  const { theme, toggleTheme } = useTheme();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handleExportData = () => {
    toast.success("Your data is being prepared for export!");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="w-full sm:w-auto flex flex-wrap gap-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="data">My Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Brewing Experience</Label>
                    <Input 
                      id="experience" 
                      value={userData.brewingExperience}
                      onChange={(e) => setUserData({...userData, brewingExperience: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Currency className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium">Currency</h3>
                  <p className="text-sm text-muted-foreground">Choose your preferred currency</p>
                </div>
                <Select value={settings.currency} onValueChange={(value) => updateSettings({ currency: value })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Thermometer className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium">Measurement System</h3>
                  <p className="text-sm text-muted-foreground">Choose between metric and imperial units</p>
                </div>
                <Select 
                  value={settings.useMetric ? "Metric" : "Imperial"}
                  onValueChange={(value) => updateSettings({ useMetric: value === "Metric" })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select system" />
                  </SelectTrigger>
                  <SelectContent>
                    {measurementSystems.map((system) => (
                      <SelectItem key={system} value={system}>{system}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                )}
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                </div>
                <Select 
                  value={theme} 
                  onValueChange={toggleTheme}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Data</CardTitle>
                <CardDescription>Download or export your brewing data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleExportData}>Export All Recipes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyAccount;
