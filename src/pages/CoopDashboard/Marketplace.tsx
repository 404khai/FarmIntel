import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav";
import CoopSideNav from "../../components/CoopSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { fetchCooperativeMembersDetail, type CooperativeMemberDetail } from "../../utils/coops";
import type { Crop } from "../../utils/crops";
import { 
  Search01Icon, 
  FilterIcon, 
  ArrowRight01Icon,
  ShoppingBag03Icon
} from "hugeicons-react";
import avatar from "../../assets/avatar.jpeg";

interface Product {
  id: number;
  farmerName: string;
  location: string;
  verified: boolean;
  rating: number;
  productName?: string;
  quantity?: string;
  price?: string;
  available?: string;
  isNew?: boolean;
  image?: string;
  member: CooperativeMemberDetail;
  crop?: Crop | null;
}

const Marketplace: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const coopId = searchParams.get("id");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!coopId) return;
      try {
        const members = await fetchCooperativeMembersDetail(parseInt(coopId));
        // Filter for farmers, and include owners as well
        const farmers = members.filter(m => {
          const rDisplay = (m.role_display || "").toLowerCase();
          const r = (m.role || "").toLowerCase();
          const uRole = (m.user_role || "").toLowerCase();
          // Show anyone who has "farmer" in their role display, coop role, or user role, OR is the owner
          return rDisplay.includes("farmer") || r.includes("farmer") || uRole.includes("farmer") || r === "owner";
        });
        
        // Map farmers to products using their real crops (first crop if available)
        const mappedProducts = farmers.map((farmer, index) => {
            const crop = (farmer.crops && farmer.crops.length > 0) ? farmer.crops[0] : null;
            return {
                id: farmer.id,
                farmerName: farmer.full_name,
                location: farmer.location || "Location not set",
                verified: farmer.status === "Active",
                rating: 4.0 + (Math.random() * 1.0),
                productName: crop?.name,
                quantity: crop ? `${(crop.quantity_kg || 0).toLocaleString()} kg` : undefined,
                price: crop?.price_per_kg !== undefined ? `₦${(crop.price_per_kg || 0).toLocaleString()} / kg` : undefined,
                available: crop?.status,
                isNew: Math.random() > 0.7,
                image: farmer.profile_pic_url || avatar,
                member: farmer,
                crop
            };
        });
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to load marketplace data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [coopId]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CoopSideNav 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        collapsed={isSidebarCollapsed} 
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}>
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-10">
          <div className="mb-6">
            <Breadcrumbs 
              items={[
                { label: "Dashboard", to: `/CoopDashboard?id=${coopId}` },
                { label: "Marketplace" }
              ]} 
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Available Supply</h1>
              <p className="text-gray-500 mt-1">Browse verified farmers and their current harvest.</p>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <FilterIcon size={16} />
                  Export List
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-lime-600 rounded-lg text-sm font-medium text-white hover:bg-lime-700">
                  <ShoppingBag03Icon size={16} />
                  Post Buying Request
                </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search crops (e.g. 'Organic Kale') or farmer names..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white transition-all text-sm"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500">
                    <option>Crop Type</option>
                </select>
                <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500">
                    <option>Location</option>
                </select>
                <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500">
                    <option>Harvest Date</option>
                </select>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="relative inline-block w-8 h-4 transition duration-200 ease-in-out">
                        <input type="checkbox" id="verified-toggle" className="peer absolute block w-4 h-4 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-lime-500 checked:bg-lime-500" />
                        <label htmlFor="verified-toggle" className="block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-lime-500"></label>
                    </div>
                    <label htmlFor="verified-toggle" className="text-sm text-gray-700 cursor-pointer select-none">Verified Only</label>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <img 
                        src={product.image} 
                        alt={product.farmerName} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-semibold text-gray-900">{product.farmerName}</h3>
                          {product.verified && (
                            <span className="text-lime-500" title="Verified">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{product.location}</span>
                          {product.rating > 0 && (
                            <span className="flex items-center gap-0.5 text-amber-500 bg-amber-50 px-1 rounded">
                                ★ {product.rating}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {product.isNew && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200">New</span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-lg shadow-sm">
                                🥬
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{product.productName}</p>
                                <p className="text-xs text-gray-500">Harvested: {product.available}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-medium text-lime-600">{product.quantity}</p>
                            <p className="text-xs text-gray-500">{product.price}</p>
                        </div>
                    </div>
                    
                    {/* Placeholder for second item if any - sticking to one for design match */}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => navigate(`/CoopDashboard/FarmerProfile/${product.member.id}`, { state: { member: product.member } })}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        View Profile
                    </button>
                    <button className="px-4 py-2 bg-lime-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-lime-700 transition-colors shadow-sm shadow-lime-200">
                        Contact Farmer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                <ArrowRight01Icon size={16} className="rotate-180" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-lime-500 text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">12</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                <ArrowRight01Icon size={16} />
            </button>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Marketplace;
