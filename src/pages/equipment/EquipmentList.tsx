
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Bookmark, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy equipment data for demonstration
const defaultEquipment = [
  { id: "1", name: "Brew Kettle", category: "Kettle", notes: "" },
  { id: "2", name: "Fermenter", category: "Fermentation", notes: "" },
  { id: "3", name: "Mash Tun", category: "Mash", notes: "" },
];

const categories = ["All", "Kettle", "Fermentation", "Mash", "Other"];

const EquipmentList = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Search and filter logic
  const filteredEquipment = defaultEquipment
    .filter(eq => categoryFilter === "All" || eq.category === categoryFilter)
    .filter(eq => eq.name.toLowerCase().includes(search.toLowerCase()));

  const handleBookmark = (id: string) => {
    setBookmarks(prev => prev.includes(id)
      ? prev.filter(bid => bid !== id)
      : [...prev, id]);
  };

  return (
    <Layout>
      <div className="space-y-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Equipment</h1>
            <p className="text-muted-foreground">Manage your brewing equipment</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Input
              className="w-48"
              placeholder="Search equipment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              startIcon={<Search className="h-4 w-4" />}
            />
            <select
              className="rounded-md border px-3 py-2 text-sm md:w-40"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Button variant="outline" className="hidden md:inline-flex">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </div>
        </div>

        {/* Bookmarks Filter */}
        {bookmarks.length > 0 && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-muted-foreground text-xs">Bookmarked:</span>
            {bookmarks.map(bid => {
              const eq = defaultEquipment.find(e => e.id === bid);
              return eq ? (
                <span
                  key={bid}
                  className="inline-flex items-center gap-1 px-2 rounded bg-accent text-xs cursor-pointer"
                  onClick={() => handleBookmark(bid)}
                >
                  {eq.name} <Bookmark className="w-3 h-3" />
                </span>
              ) : null;
            })}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-left">Notes</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map(eq => (
                  <tr key={eq.id} className="border-b hover:bg-muted/60">
                    <td className="px-3 py-2">{eq.name}</td>
                    <td className="px-3 py-2">{eq.category}</td>
                    <td className="px-3 py-2">{eq.notes}</td>
                    <td>
                      <Button
                        size="sm"
                        variant={bookmarks.includes(eq.id) ? "default" : "outline"}
                        onClick={() => handleBookmark(eq.id)}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </td>
                    <td>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EquipmentList;
