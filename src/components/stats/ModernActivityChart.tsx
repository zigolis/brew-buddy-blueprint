
import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChartProps {
  data: any[];
  title?: string;
  description?: string;
  className?: string;
}

export const ModernActivityChart = ({
  data = [],
  title = "Recipe Activity",
  description = "Brewing activities over the past 30 days",
  className,
}: ChartProps) => {
  const chartData = useMemo(() => {
    if (data && data.length > 0) return data;
    
    const defaultData = [];
    const date = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const pastDate = new Date(date);
      pastDate.setDate(date.getDate() - i);
      
      defaultData.push({
        date: pastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        created: Math.floor(Math.random() * 5),
        brewed: Math.floor(Math.random() * 3),
        updated: Math.floor(Math.random() * 7),
      });
    }
    
    return defaultData;
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="h-8 w-[110px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderRadius: "0.5rem",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="created"
                name="Created"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="brewed"
                name="Brewed"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="updated"
                name="Updated"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
