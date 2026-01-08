import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/DashboardNav";
import BuyerSideNav from "../../components/BuyerSideNav";
import { Calendar02Icon, CreditCardPosIcon, ChartBarLineIcon, FilterIcon, Download02Icon } from "hugeicons-react";
import Breadcrumbs from "../../components/Breadcrumbs";
import user1 from "../../assets/user1.jpeg";
import toast, { Toaster } from "react-hot-toast";
import { listOrders, type Order } from "../../utils/orders";

const BuyerOrders: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("buyerSidebarCollapsed") === "true";
  });
  
  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const newState = !prev;
      localStorage.setItem("buyerSidebarCollapsed", String(newState));
      return newState;
    });
  };

  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "fulfilled">("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await listOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Helper to safely get nested properties or fallback
  const getFarmerName = (order: Order) => {
    if (order.farmer_details?.full_name) {
        return order.farmer_details.full_name;
    }
    if (typeof order.farmer === 'object' && order.farmer !== null && 'full_name' in order.farmer) {
        return (order.farmer as any).full_name;
    }
    return `Farmer #${typeof order.farmer === 'number' ? order.farmer : (order.farmer as any).id}`;
  };

  const getFarmerLocation = (order: Order) => {
     if (order.farmer_details?.city || order.farmer_details?.state) {
        return `${order.farmer_details.city || ''}, ${order.farmer_details.state || ''}`;
     }
     if (typeof order.farmer === 'object' && order.farmer !== null && 'location' in order.farmer) {
        return (order.farmer as any).location || "Unknown Location";
    }
    return "Unknown Location";
  };

  const getFarmerImage = (order: Order) => {
    if (order.farmer_details?.profile_pic_url) {
        return order.farmer_details.profile_pic_url;
    }
    return user1; // Fallback
  };

  const getCropImage = (order: Order) => {
    if (order.crop_details?.image_url) {
        return order.crop_details.image_url;
    }
    if (typeof order.crop === 'object' && order.crop !== null && 'image_url' in order.crop) {
        return (order.crop as any).image_url;
    }
    return null;
  };

  const getCropName = (order: Order) => {
    if (order.crop_details?.name) {
        return order.crop_details.name;
    }
    if (typeof order.crop === 'object' && order.crop !== null && 'name' in order.crop) {
        return (order.crop as any).name;
    }
    return `Crop #${typeof order.crop === 'number' ? order.crop : (order.crop as any).id}`;
  };
  
  const getCropVariety = (order: Order) => {
    if (order.crop_details?.variety) {
        return order.crop_details.variety;
    }
    if (typeof order.crop === 'object' && order.crop !== null && 'variety' in order.crop) {
        return (order.crop as any).variety;
    }
    return "N/A";
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
        case "PENDING": return "bg-yellow-100 text-yellow-700";
        case "ACCEPTED": return "bg-emerald-100 text-emerald-700";
        case "DECLINED": return "bg-red-100 text-red-700";
        case "PAID": return "bg-blue-100 text-blue-700";
        case "SHIPPED": return "bg-indigo-100 text-indigo-700";
        case "COMPLETED": return "bg-gray-100 text-gray-700";
        case "CANCELLED": return "bg-gray-200 text-gray-600";
        default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status.toLowerCase() === filter;
  });

  return (
    <div className="flex min-h-screen bg-white">
      <BuyerSideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        collapsed={isSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <DashboardNav
          onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onToggleCollapse={handleToggleCollapse}
        />
        <Toaster position="top-right" />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Home", to: "/Home" }, { label: "Dashboard", to: "/BuyerDashboard" }, { label: "Orders" }]} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">My Orders</h1>
              <p className="text-gray-500 mt-1">Track your purchases and delivery status.</p>
            </div>
            <button className="px-4 py-2 rounded-md bg-lime-600 text-white text-sm flex items-center gap-2"><Download02Icon size={18} /> Export Report</button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Pending</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-50 text-orange-600"><Calendar02Icon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">{orders.filter(o => o.status === "PENDING").length}</p>
                <p className="text-xs mt-1 text-gray-500">awaiting confirmation</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Total Spent</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600"><CreditCardPosIcon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">
                    ₦{orders.reduce((acc, curr) => acc + (parseFloat(curr.total_price) || 0), 0).toLocaleString()}
                </p>
                <p className="text-xs mt-1 text-gray-500">total investment</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Total Orders</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600"><ChartBarLineIcon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
                <p className="text-xs mt-1 text-gray-500">all time</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-[240px]">
                <FilterIcon size={18} className="text-gray-600" />
                <input type="text" placeholder="Search by farmer name, order ID, or crop..." className="bg-transparent outline-0 w-full text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setFilter("all")} className={`px-3 py-2 rounded-full text-sm ${filter === "all" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>All Orders</button>
                <button onClick={() => setFilter("pending")} className={`px-3 py-2 rounded-full text-sm ${filter === "pending" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>Pending</button>
                <button onClick={() => setFilter("accepted")} className={`px-3 py-2 rounded-full text-sm ${filter === "accepted" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>Accepted</button>
                <button onClick={() => setFilter("fulfilled")} className={`px-3 py-2 rounded-full text-sm ${filter === "fulfilled" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>Fulfilled</button>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-12 gap-0 text-xs font-semibold text-gray-500 border-b px-4 py-3">
              <div className="col-span-2">Farmer</div>
              <div className="col-span-2">Crop</div>
              <div className="col-span-2">Variety</div>
              <div className="col-span-1">Quantity</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-1">Order ID</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {loading ? (
                 <div className="p-8 text-center text-gray-500">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
                 <div className="p-8 text-center text-gray-500">No orders found.</div>
            ) : (
                filteredOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-12 gap-0 items-center px-4 py-3 border-b last:border-none hover:bg-gray-50">
                    {/* Farmer Column */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-3">
                        <img src={getFarmerImage(order)} alt="Farmer" className="w-9 h-9 rounded-full object-cover" />
                        <div className="truncate">
                          <p className="text-sm font-medium text-gray-800 truncate" title={getFarmerName(order)}>{getFarmerName(order)}</p>
                          <p className="text-xs text-gray-500 truncate" title={getFarmerLocation(order)}>{getFarmerLocation(order)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Crop Column (Image + Name) */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-3">
                        <img 
                            src={getCropImage(order) || "https://placehold.co/40"} 
                            alt="Crop" 
                            className="w-10 h-10 rounded-md object-cover border border-gray-100" 
                        />
                        <p className="text-sm font-medium text-gray-800 truncate" title={getCropName(order)}>{getCropName(order)}</p>
                      </div>
                    </div>

                    {/* Variety Column */}
                    <div className="col-span-2 text-sm text-gray-600 truncate" title={getCropVariety(order)}>
                      {getCropVariety(order)}
                    </div>

                    {/* Quantity Column */}
                    <div className="col-span-1 text-sm text-gray-600 font-medium">
                      {parseFloat(order.quantity).toLocaleString()} kg
                    </div>

                    {/* Price Column */}
                    <div className="col-span-2 text-sm text-gray-800 font-semibold">
                      ₦{parseFloat(order.total_price).toLocaleString()}
                    </div>

                    {/* Order ID Column */}
                    <div className="col-span-1 text-sm text-gray-500 truncate">
                      #{order.id}
                    </div>

                    {/* Status Column */}
                    <div className="col-span-1">
                      <span className={`text-xs px-2 py-[2px] rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                    </div>

                    {/* Actions Column */}
                    <div className="col-span-1 flex items-center gap-2 justify-end">
                      {/* Buyer actions can be added here, e.g., Cancel, Pay */}
                      {order.status === "PENDING" && (
                        <span className="text-xs text-gray-400">Wait Approval</span>
                      )}
                      {order.status === "ACCEPTED" && (
                         <button className="px-2 py-1 rounded bg-lime-600 text-white text-xs hover:bg-lime-700">Pay Now</button>
                      )}
                    </div>
                  </div>
                ))
            )}
            
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600">
              <p>Showing {filteredOrders.length} orders</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BuyerOrders;
