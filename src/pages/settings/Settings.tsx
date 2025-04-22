
import { MapPin, Currency, Thermometer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/contexts/SettingsContext";
import { Layout } from "@/components/layout/Layout";

const locations = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Spain", "Italy"];
const currencies = ["USD", "CAD", "GBP", "AUD", "EUR"];

export default function Settings() {
  const { settings, updateSettings } = useSettings();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Customize your brewing experience</p>
        </div>
        
        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">Location</h3>
                <p className="text-sm text-muted-foreground">Set your location for regional preferences</p>
              </div>
              <Select value={settings.location} onValueChange={(value) => updateSettings({ location: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

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
                <p className="text-sm text-muted-foreground">Toggle between metric and imperial units</p>
              </div>
              <Switch 
                checked={settings.useMetric}
                onCheckedChange={(checked) => updateSettings({ useMetric: checked })}
              />
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
