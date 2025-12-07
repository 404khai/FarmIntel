import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import { Search01Icon, PlusSignIcon } from "hugeicons-react";
import corn from "../../assets/corn.jpeg";
import tomato from "../../assets/tomato.jpeg";
import banana from "../../assets/banana.jpeg";
import greenPeas from "../../assets/greenPeas.jpeg";
import rice from "../../assets/rice.jpeg";
import okra from "../../assets/okra.jpeg";

const mockCrops = [
  { id: 1, name: "Corn", quantity: 120, img: corn },
  { id: 2, name: "Banana", quantity: 85, img: banana },
  { id: 3, name: "Rice", quantity: 200, img: rice },
  { id: 4, name: "Green Peas", quantity: 120, img: greenPeas },
  { id: 5, name: "Okra", quantity: 85, img: okra },
  { id: 6, name: "Tomato", quantity: 200, img: tomato},
];

const Crops: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [crops, setCrops] = useState(mockCrops);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      <FarmerSideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-20 px-6 sm:px-8 pb-10 ml-60 min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">My Crops</h2>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <PlusSignIcon size={18} /> Add Crop
            </button>
          </div>

          {/* Search + Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow w-full max-w-sm">
              <Search01Icon size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search crops..."
                className="ml-2 w-full outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                className="bg-white px-3 py-2 rounded-lg shadow cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="low">Low Quantity</option>
                <option value="high">High Quantity</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Crop Name</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrops.map((crop) => (
                  <tr key={crop.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <img src={crop.img} alt={crop.name} className="w-20 h-20 rounded-md object-cover" />
                    </td>
                    <td className="p-4 font-semibold">{crop.name}</td>
                    <td className="p-4">{crop.quantity}</td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:underline mr-3">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Crops;
