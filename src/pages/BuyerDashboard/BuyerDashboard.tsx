import React, { useEffect, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import { LuShoppingCart, LuHandshake, LuWallet, LuTrendingUp } from "react-icons/lu";
import BuyerSideNav from "../../components/BuyerSideNav";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import corn from "../../assets/corn.jpeg";
import tomato from "../../assets/tomato.jpeg";
import banana from "../../assets/banana.jpeg";
import greenPeas from "../../assets/greenPeas.jpeg";
import rice from "../../assets/rice.jpeg";
import okra from "../../assets/okra.jpeg";

const Avatar: React.FC<{ name?: string; imageUrl?: string | null; size?: number }> = ({
  name,
  imageUrl,
  size = 44,
}) => {
  const initials = (name || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (imageUrl)
    return (
      <img
        src={imageUrl}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );

  return (
    <div
      className="rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
};

const BuyerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  type User = { firstname?: string; name?: string } | null;
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Buyer";

  const kpis = [
    { title: "Total Orders", value: "18", icon: <LuShoppingCart className="text-green-600" />, tint: "bg-green-50" },
    { title: "Active RFQs", value: "5", icon: <LuTrendingUp className="text-blue-600" />, tint: "bg-blue-50" },
    { title: "Seller Matches", value: "12", icon: <LuHandshake className="text-purple-600" />, tint: "bg-purple-50" },
    { title: "Spend YTD", value: "$42,300", icon: <LuWallet className="text-orange-600" />, tint: "bg-orange-50" },
  ];

  type Listing = {
    id: number;
    name: string;
    variety: string;
    quantityText: string;
    status: "Available" | "Pending" | "Sold Out";
    image_url: string;
    seller: string;
    location: string;
  };

  const listings: Listing[] = [
    { id: 1, name: "Maize", variety: "Yellow Dent", quantityText: "2.0 Tons", status: "Available", image_url: corn, seller: "GreenFields Co.", location: "Kaduna" },
    { id: 2, name: "Tomatoes", variety: "Roma", quantityText: "500 kg", status: "Available", image_url: tomato, seller: "FreshHarvest Ltd.", location: "Benue" },
    { id: 3, name: "Potatoes", variety: "Russet", quantityText: "1.2 Tons", status: "Pending", image_url: greenPeas, seller: "Highland Farms", location: "Plateau" },
    { id: 4, name: "Okra", variety: "Clemson Spineless", quantityText: "300 kg", status: "Sold Out", image_url: okra, seller: "Sunrise Agro", location: "Oyo" },
    { id: 5, name: "Banana", variety: "Cavendish", quantityText: "150 Crates", status: "Available", image_url: banana, seller: "Tropical Produce", location: "Cross River" },
    { id: 6, name: "Rice", variety: "Long Grain", quantityText: "1.8 Tons", status: "Available", image_url: rice, seller: "RiverBank Farms", location: "Niger" },
  ];

  const messages = [
    { from: "GreenFields Co.", text: "Can deliver maize in 5 days.", time: "2h ago" },
    { from: "Sunrise Agro", text: "Okra sold out, new batch next week.", time: "6h ago" },
    { from: "FreshHarvest Ltd.", text: "Tomatoes price revised for bulk order.", time: "1d ago" },
    { from: "RiverBank Farms", text: "Rice moisture content at 12%.", time: "2d ago" },
  ];

  const marketTrend = [
    { month: "Jan", price: 120 },
    { month: "Feb", price: 132 },
    { month: "Mar", price: 125 },
    { month: "Apr", price: 138 },
    { month: "May", price: 145 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <BuyerSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-16 px-4 sm:px-6 md:px-8 ml-0 md:ml-64 pb-10 h-screen overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Hi, {firstName}</h1>
            <p className="text-gray-500 mt-1">Your supply chain overview and marketplace activity.</p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpis.map((k, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-md ${k.tint}`}>{k.icon}</div>
                  <p className="text-2xl font-semibold text-gray-800">{k.value}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">{k.title}</p>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-12 lg:col-span-8 bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Available Listings</h2>
                <div className="text-sm text-gray-500">Showing {listings.length}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {listings.map((c) => (
                  <div key={c.id} className="border rounded-xl overflow-hidden bg-white">
                    <img src={c.image_url} alt={c.name} className="h-32 w-full object-cover" />
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-base font-semibold text-gray-800">{c.name}</p>
                          <p className="text-sm text-gray-500">{c.variety}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${c.status === "Available" ? "bg-green-100 text-green-700" : c.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-700"}`}>{c.status}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm text-gray-600">{c.quantityText}</p>
                        <p className="text-sm text-gray-500">{c.location}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar name={c.seller} size={28} />
                          <span className="text-sm text-gray-700">{c.seller}</span>
                        </div>
                        <button className="text-sm bg-lime-600 text-white px-3 py-1 rounded-md">Request Quote</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Messages</h2>
                <div className="space-y-3">
                  {messages.map((m, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Avatar name={m.from} size={32} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-800">{m.from}</p>
                          <span className="text-xs text-gray-500">{m.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{m.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Market Trend</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={marketTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">Average maize price (last 5 months)</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
