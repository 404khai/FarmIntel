import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav";
import CoopSideNav from "../../components/CoopSideNav";
import { ArrowLeft01Icon, Mail01Icon, Call02Icon, Location01Icon, Store04Icon, ShoppingCart01Icon } from "hugeicons-react";
import avatar from "../../assets/avatar.jpeg";
import corn from "../../assets/corn.jpeg";
import toast, { Toaster } from "react-hot-toast";
import { fetchCropsByFarmerId, type Crop } from "../../utils/crops";
import { placeOrder } from "../../utils/orders";

const FarmerProfile: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const member = state?.member;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loadingCrops, setLoadingCrops] = useState(true);

  // Order Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<string>("");
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    if (member?.crops && member.crops.length > 0) {
        setCrops(member.crops);
        setLoadingCrops(false);
    } else if (member?.id) {
        fetchCropsByFarmerId(member.id)
            .then(data => setCrops(data))
            .catch(err => {
                console.error(err);
                toast.error("Failed to load crops");
            })
            .finally(() => setLoadingCrops(false));
    } else {
        setLoadingCrops(false);
    }
  }, [member]);

  if (!member) {
    return (
      <div className="p-10 text-center">
        <p>Member not found. <button onClick={() => navigate(-1)} className="text-lime-600 underline">Go back</button></p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CoopSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Toaster position="top-right" />
        
        <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-10">
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-4"
            >
              <ArrowLeft01Icon size={20} />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Farmer Profile</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-lime-500 to-green-600"></div>
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-12 left-6">
                <img 
                  src={member.profile_pic_url || avatar} 
                  alt={member.full_name} 
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                />
              </div>
              <div className="mt-14 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{member.full_name}</h2>
                  <p className="text-gray-500">{member.business_name || "Farm Owner"}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-700 text-xs font-medium border border-lime-200">
                      {member.role_display || "Farmer"}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                      member.status === "Active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}>
                      {member.status || "Active"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors shadow-sm">
                    <Mail01Icon size={18} />
                    Message
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2 text-gray-500">
                    <Location01Icon size={18} />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <p className="text-gray-900 font-medium">{member.location || "Not specified"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2 text-gray-500">
                    <Call02Icon size={18} />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="text-gray-900 font-medium">{member.phone || "Not specified"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2 text-gray-500">
                    <Store04Icon size={18} />
                    <span className="text-sm font-medium">Member ID</span>
                  </div>
                  <p className="text-gray-900 font-medium">{member.member_id || `#${member.id}`}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Current Harvests</h3>
            
            {loadingCrops ? (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <p className="text-gray-500">Loading crops...</p>
                </div>
            ) : crops.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Store04Icon size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No Active Listings</h3>
                    <p className="text-gray-500 max-w-sm">
                        {member.full_name} hasn't listed any crops for sale yet. Check back later for fresh produce updates.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-semibold text-sm">Crop Name</th>
                                    <th className="p-4 font-semibold text-sm">Variety</th>
                                    <th className="p-4 font-semibold text-sm">Quantity (kg)</th>
                                    <th className="p-4 font-semibold text-sm">Harvest Date</th>
                                    <th className="p-4 font-semibold text-sm">Status</th>
                                    <th className="p-4 font-semibold text-sm">Price/kg (₦)</th>
                                    <th className="p-4 font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {crops.map((crop) => (
                                    <tr key={crop.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={crop.image_url || corn} alt={crop.name} className="w-10 h-10 rounded-md object-cover border border-gray-100" />
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">{crop.name}</p>
                                                    <p className="text-xs text-gray-400">ID: #{4620 + crop.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{crop.variety}</td>
                                        <td className="p-4 text-sm text-gray-600">{(crop.quantity_kg || 0).toLocaleString()}kg</td>
                                        <td className="p-4 text-sm text-gray-600">{crop.harvest_date}</td>
                                        <td className="p-4">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                crop.status === "Available" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : 
                                                crop.status === "Pending" ? "bg-yellow-50 text-yellow-700 border border-yellow-100" : 
                                                "bg-gray-100 text-gray-600 border border-gray-200"
                                            }`}>
                                                {crop.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-gray-900">₦{(crop.price_per_kg || 0).toLocaleString()}</td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => {
                                                    setSelectedCrop(crop);
                                                    setOrderQuantity("");
                                                    setIsOrderModalOpen(true);
                                                }}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-lime-600 text-white text-xs font-medium rounded-lg hover:bg-lime-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={crop.status !== "Available"}
                                            >
                                                <ShoppingCart01Icon size={14} />
                                                Place Order
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
          </div>
          
          {/* Order Modal */}
          {isOrderModalOpen && selectedCrop && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Place Order</h3>
                        <button 
                            onClick={() => setIsOrderModalOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <img 
                                src={selectedCrop.image_url || corn} 
                                alt={selectedCrop.name} 
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <p className="font-bold text-gray-900">{selectedCrop.name}</p>
                                <p className="text-sm text-gray-500">{selectedCrop.variety}</p>
                                <p className="text-xs text-lime-600 font-medium mt-1">
                                    ₦{(selectedCrop.price_per_kg || 0).toLocaleString()} / kg
                                </p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity (kg)
                            </label>
                            <input 
                                type="number" 
                                value={orderQuantity}
                                onChange={(e) => setOrderQuantity(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                placeholder={`Max: ${selectedCrop.quantity_kg}`}
                                max={selectedCrop.quantity_kg}
                                min={1}
                            />
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500">Available: {selectedCrop.quantity_kg} kg</span>
                                {orderQuantity && !isNaN(parseFloat(orderQuantity)) && (
                                    <span className="text-sm font-bold text-gray-900">
                                        Total: ₦{(parseFloat(orderQuantity) * (selectedCrop.price_per_kg || 0)).toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button 
                                onClick={() => setIsOrderModalOpen(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                                disabled={placingOrder}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={async () => {
                                    if (!orderQuantity || parseFloat(orderQuantity) <= 0) {
                                        toast.error("Please enter a valid quantity");
                                        return;
                                    }
                                    if (parseFloat(orderQuantity) > selectedCrop.quantity_kg) {
                                        toast.error("Quantity exceeds available stock");
                                        return;
                                    }

                                    setPlacingOrder(true);
                                    try {
                                        await placeOrder(selectedCrop.id, parseFloat(orderQuantity));
                                        toast.success("Order placed successfully!");
                                        setIsOrderModalOpen(false);
                                    } catch (error) {
                                        console.error(error);
                                        toast.error("Failed to place order. Please try again.");
                                    } finally {
                                        setPlacingOrder(false);
                                    }
                                }}
                                className="flex-1 px-4 py-2 bg-lime-600 text-white font-medium rounded-lg hover:bg-lime-700 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                                disabled={placingOrder}
                            >
                                {placingOrder ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                    "Confirm Order"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default FarmerProfile;