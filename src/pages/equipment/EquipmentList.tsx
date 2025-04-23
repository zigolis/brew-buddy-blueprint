
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Trash2, Pencil } from "lucide-react";
import { CustomInput } from "@/components/ui/custom-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useBrewContext } from "@/contexts/BrewContext";

// Dummy equipment data for demonstration
const categories = ["All", "Kettle", "Fermentation", "Mash", "Other"];

const EquipmentList = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { equipment, removeEquipment } = useBrewContext();
  const navigate = useNavigate();
  
  // Search and filter logic
  const filteredEquipment = equipment
    .filter(eq => categoryFilter === "All" || eq.category === categoryFilter)
    .filter(eq => eq.name.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (id: string) => {
    navigate(`/equipment/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    removeEquipment(id);
  };
  
  const handleAddEquipment = () => {
    navigate("/equipment/new");
  };

  return (
    <Layout>
      <div className="space-y-6 w-full">
        <div>
          <h1 className="text-3xl font-bold">Equipment</h1>
          <p className="text-muted-foreground">Manage your brewing equipment</p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <CustomInput
            className="w-full md:w-64"
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startIcon={<Search className="h-4 w-4" />}
          />
          <select
            className="rounded-md border px-3 py-2 text-sm w-full md:w-40"
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
          <Button onClick={handleAddEquipment}>
            <Plus className="h-4 w-4 mr-2" />
            Add Equipment
          </Button>
        </div>

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
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map(eq => (
                  <tr key={eq.id} className="border-b hover:bg-muted/60">
                    <td className="px-3 py-2">{eq.name}</td>
                    <td className="px-3 py-2">{eq.category}</td>
                    <td className="px-3 py-2">{eq.notes}</td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(eq.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(eq.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEquipment.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No equipment found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EquipmentList;
