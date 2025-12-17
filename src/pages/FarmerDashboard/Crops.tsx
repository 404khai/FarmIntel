import React, { useEffect, useMemo, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import { Search01Icon, PlusSignIcon } from "hugeicons-react";
import { LuPencil, LuTrash2, LuImagePlus } from "react-icons/lu";
import corn from "../../assets/corn.jpeg";
import Breadcrumbs from "../../components/Breadcrumbs";

import { fetchCrops, createCrop, updateCrop, deleteCrop, type Crop } from "../../utils/crops";
import toast, { Toaster } from "react-hot-toast";

const Crops: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    variety: "",
    quantity: "",
    harvestDate: "",
    status: "Available",
    pricePerKg: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    
    fetchCrops().then(data => setCrops(data)).catch(err => {
        console.error(err);
        toast.error("Failed to load crops");
        // Fallback to empty or previous if needed, but for now we trust the fetch
    });
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
        <Toaster position="top-right" />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Home", to: "/Home" }, { label: "Dashboard", to: "/FarmerDashboard" }, { label: "My Crops" }]} />
          </div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">My Crop Inventory</h2>
              <p className="text-gray-500 mt-1">Manage your active harvest listings, update stock levels, and track sales performance within the cooperative.</p>
            </div>
            <button
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", variety: "", quantity: "", harvestDate: "", status: "Available", pricePerKg: "" });
                setPreviewUrl(null);
                setSelectedFile(null);
                setShowModal(true);
              }}
              className="hidden sm:flex items-center gap-2 bg-lime-600 text-white px-4 py-2 rounded-lg"
            >
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
                  <th className="p-4">Quantity (kg)</th>
                  <th className="p-4">Harvest Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Price/kg (₦)</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrops.map((crop) => (
                  <tr key={crop.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={crop.img || corn} alt={crop.name} className="w-12 h-12 rounded-md object-cover" />
                        <div>
                          <p className="font-semibold text-gray-800">{crop.name}</p>
                          <p className="text-xs text-gray-400">ID: #{4620 + crop.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{crop.variety}</td>
                    <td className="p-4">{(crop.quantity || 0).toLocaleString()}kg</td>
                    <td className="p-4">{crop.harvestDate}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${crop.status === "Available" ? "bg-emerald-100 text-emerald-700" : crop.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-700"}`}>{crop.status}</span>
                    </td>
                    <td className="p-4">₦{(crop.pricePerKg || 0).toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                          title="Update"
                          onClick={() => {
                            setEditingId(crop.id);
                            setForm({
                              name: crop.name,
                              variety: crop.variety,
                              quantity: crop.quantity.toString() || "",
                              harvestDate: crop.harvestDate,
                              status: crop.status,
                              pricePerKg: crop.pricePerKg?.toString() || "",
                            });
                            setPreviewUrl(crop.img || null);
                            setSelectedFile(null);
                            setShowModal(true);
                          }}
                        >
                          <LuPencil size={16} />
                        </button>
                        <button
                          className="p-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                          title="Remove"
                          onClick={async () => {
                              if (!window.confirm("Are you sure?")) return;
                              try {
                                  await deleteCrop(crop.id);
                                  setCrops((prev) => prev.filter((c) => c.id !== crop.id));
                                  toast.success("Crop deleted");
                              } catch(e) {
                                  console.error(e);
                                  toast.error("Failed to delete crop");
                              }
                          }}
                        >
                          <LuTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
              <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">{editingId ? "Update Crop" : "Add New Crop"}</h3>
                  <button
                    className="px-3 py-1 rounded-md bg-gray-100 text-gray-800 text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Image</label>
                    <div className="mt-2 flex items-center gap-3">
                      {previewUrl ? (
                        <img src={previewUrl} alt="preview" className="w-16 h-16 rounded-md object-cover border" />
                      ) : (
                        <div className="w-16 h-16 rounded-md border flex items-center justify-center text-gray-400">
                          <LuImagePlus />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setPreviewUrl(url);
                            setSelectedFile(file);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Crop Name</label>
                      <input
                        className="mt-1 w-full border rounded-md px-3 py-2"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Variety</label>
                      <input
                        className="mt-1 w-full border rounded-md px-3 py-2"
                        value={form.variety}
                        onChange={(e) => setForm((f) => ({ ...f, variety: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Quantity (kg)</label>
                      <input
                        type="number"
                        className="mt-1 w-full border rounded-md px-3 py-2"
                        placeholder="50"
                        value={form.quantity}
                        onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Price per Kg (₦)</label>
                      <input
                        type="number"
                        className="mt-1 w-full border rounded-md px-3 py-2"
                        placeholder="0.00"
                        value={form.pricePerKg}
                        onChange={(e) => setForm((f) => ({ ...f, pricePerKg: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Harvest Date</label>
                      <input
                        type="date"
                        className="mt-1 w-full border rounded-md px-3 py-2"
                        value={form.harvestDate}
                        onChange={(e) => setForm((f) => ({ ...f, harvestDate: e.target.value }))}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm text-gray-600">Status</label>
                      <select
                        className="mt-1 w-full border rounded-md px-3 py-2"
                        value={form.status}
                        onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                      >
                        <option>Available</option>
                        <option>Pending</option>
                        <option>Sold Out</option>
                      </select>
                    </div>
                  </div>
                </div>
                  <div className="flex items-center justify-end gap-3 p-4 border-t">
                  <button
                    className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-2 rounded-md bg-lime-600 text-white text-sm"
                    onClick={async () => {
                      const formData = new FormData();
                      formData.append("name", form.name);
                      formData.append("variety", form.variety);
                      formData.append("quantityText", form.quantity);
                      formData.append("harvestDate", form.harvestDate);
                      formData.append("status", form.status);
                      formData.append("pricePerKg", form.pricePerKg);
                      if (selectedFile) {
                        formData.append("image", selectedFile);
                      }

                      try {
                        if (editingId) {
                          const updated = await updateCrop(editingId, formData);
                          setCrops((prev) => prev.map((c) => (c.id === editingId ? updated : c)));
                          toast.success("Crop updated successfully");
                        } else {
                          const created = await createCrop(formData);
                          setCrops((prev) => [created, ...prev]);
                          toast.success("Crop added successfully");
                        }
                        setShowModal(false);
                      } catch (e) {
                        console.error(e);
                        toast.error("Failed to save crop");
                      }
                    }}
                  >
                    {editingId ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Crops;
