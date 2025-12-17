import React, { useEffect, useMemo, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import { Search01Icon, PlusSignIcon } from "hugeicons-react";
import corn from "../../assets/corn.jpeg";
import tomato from "../../assets/tomato.jpeg";
import banana from "../../assets/banana.jpeg";
import greenPeas from "../../assets/greenPeas.jpeg";
import rice from "../../assets/rice.jpeg";
import okra from "../../assets/okra.jpeg";
import Breadcrumbs from "../../components/Breadcrumbs";

const mockCrops = [
  { id: 1, name: "Maize", variety: "Yellow Dent", quantityText: "2.0 Tons", harvestDate: "Oct 20, 2023", status: "Pending", img: corn },
  { id: 2, name: "Tomatoes", variety: "Roma (Plum)", quantityText: "500 kg", harvestDate: "Oct 24, 2023", status: "Available", img: tomato },
  { id: 3, name: "Green Peas", variety: "Russet", quantityText: "1.2 Tons", harvestDate: "Oct 15, 2023", status: "Available", img: greenPeas },
  { id: 4, name: "Okra", variety: "Red Creole", quantityText: "300 kg", harvestDate: "Oct 10, 2023", status: "Sold Out", img: okra },
  { id: 5, name: "Banana", variety: "Savoy", quantityText: "150 Heads", harvestDate: "Oct 05, 2023", status: "Sold Out", img: banana },
  { id: 6, name: "Rice", variety: "Long Grain", quantityText: "1.8 Tons", harvestDate: "Oct 12, 2023", status: "Available", img: rice },
];

const Crops: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [crops] = useState(mockCrops);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const filteredCrops = useMemo(() => {
    let list = crops.filter((crop) => crop.name.toLowerCase().includes(search.toLowerCase()));
    if (filter === "available") list = list.filter((c) => c.status === "Available");
    if (filter === "pending") list = list.filter((c) => c.status === "Pending");
    if (filter === "soldout") list = list.filter((c) => c.status === "Sold Out");
    if (sortBy === "date_desc") list = list.sort((a, b) => (new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime()));
    if (sortBy === "date_asc") list = list.sort((a, b) => (new Date(a.harvestDate).getTime() - new Date(b.harvestDate).getTime()));
    return list;
  }, [crops, search, filter, sortBy]);

  return (
    <div className="flex min-h-screen bg-white">
      <FarmerSideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        collapsed={isSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <DashboardNav
          onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
        />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Home", to: "/Home" }, { label: "Dashboard", to: "/FarmerDashboard" }, { label: "My Crops" }]} />
          </div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">My Crop Inventory</h2>
              <p className="text-gray-500 mt-1">Manage your active harvest listings, update stock levels, and track sales performance within the cooperative.</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 bg-lime-600 text-white px-4 py-2 rounded-lg">
              <PlusSignIcon size={18} /> Add New Crop
            </button>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Total Active Listings</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-semibold text-gray-800">{crops.length} Crops</p>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">+2 new</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Total Volume</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-semibold text-gray-800">4.5 Tons</p>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">+15%</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Items Sold (This Month)</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-semibold text-gray-800">850 kg</p>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">+5%</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Pending Verification</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-semibold text-gray-800">3 Batches</p>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">0 pending</span>
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow w-full sm:max-w-md">
              <Search01Icon size={18} className="text-gray-500" />
              <input type="text" placeholder="Search crop name, variety..." className="ml-2 w-full outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <select className="bg-white px-3 py-2 rounded-lg shadow" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="soldout">Sold Out</option>
              </select>
              <select className="bg-white px-3 py-2 rounded-lg shadow" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date_desc">Harvest Date (Newest)</option>
                <option value="date_asc">Harvest Date (Oldest)</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-4">Crop Name</th>
                  <th className="p-4">Variety</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Harvest Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrops.map((crop) => (
                  <tr key={crop.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={crop.img} alt={crop.name} className="w-12 h-12 rounded-md object-cover" />
                        <div>
                          <p className="font-semibold text-gray-800">{crop.name}</p>
                          <p className="text-xs text-gray-400">ID: #{4620 + crop.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{crop.variety}</td>
                    <td className="p-4">{crop.quantityText}</td>
                    <td className="p-4">{crop.harvestDate}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${crop.status === "Available" ? "bg-emerald-100 text-emerald-700" : crop.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-700"}`}>{crop.status}</span>
                    </td>
                    <td className="p-4">
                      <button className="text-lime-700 hover:underline mr-3">Update</button>
                      <button className="text-red-600 hover:underline">Remove</button>
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
