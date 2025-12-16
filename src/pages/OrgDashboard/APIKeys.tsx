import React, { useEffect, useMemo, useState } from "react";
import OrgDashboardNav from "../../components/OrgDashboardNav";
import OrgSideNav from "../../components/OrgSideNav";
import { BookOpen02Icon, Key01Icon } from "hugeicons-react";
import { LuRefreshCw, LuTrash2, LuCopy, LuCircleCheck } from "react-icons/lu";
import toast from "react-hot-toast";

type ApiKey = {
  id: string;
  name: string;
  note?: string;
  prefix: string;
  status: "Active" | "Revoked";
  created: string;
  lastUsed: string;
};

const APIKeys: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [keys, setKeys] = useState<ApiKey[]>([{
    id: "k_1",
    name: "Mobile App - Production",
    note: "iOS & Android Clients",
    prefix: "fi_live_839",
    status: "Active",
    created: "Oct 24, 2023",
    lastUsed: "2 mins ago",
  },{
    id: "k_2",
    name: "Inventory Sync Service",
    note: "Warehouse Backend",
    prefix: "fi_test_721",
    status: "Active",
    created: "Nov 01, 2023",
    lastUsed: "1 hour ago",
  },{
    id: "k_3",
    name: "Legacy System v1",
    note: "Deprecated",
    prefix: "fi_live_902",
    status: "Revoked",
    created: "Jan 15, 2023",
    lastUsed: "Never",
  }]);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEnv, setNewEnv] = useState<"live" | "test">("live");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Developer";

  const activeCount = useMemo(() => keys.filter(k => k.status === "Active").length, [keys]);

  const generatePrefix = () => {
    const rand = Math.floor(Math.random()*900+100).toString();
    return `fi_${newEnv}_${rand}`;
  };

  const copyPrefix = (p: string) => {
    navigator.clipboard.writeText(p).then(() => toast.success("Token prefix copied"));
  };

  const revokeKey = (id: string) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, status: "Revoked", lastUsed: "Never" } : k));
    toast.success("Key revoked");
  };

  const rotateKey = (id: string) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, prefix: generatePrefix(), created: new Date().toLocaleDateString(), lastUsed: "Just now" } : k));
    toast.success("Key rotated");
  };

  const createKey = () => {
    if (!newName.trim()) { toast.error("Enter a key name"); return; }
    const k: ApiKey = {
      id: `k_${Date.now()}`,
      name: newName.trim(),
      note: newEnv === "live" ? "Production" : "Development",
      prefix: generatePrefix(),
      status: "Active",
      created: new Date().toLocaleDateString(),
      lastUsed: "Never",
    };
    setKeys(prev => [k, ...prev]);
    setShowCreate(false);
    setNewName("");
    toast.success("New key created");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OrgSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <OrgDashboardNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-16 px-4 sm:px-6 md:px-8 pb-10 ml-0 md:ml-64 min-h-screen overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Key01Icon />
              <h1 className="text-2xl font-semibold text-gray-800">API Key Management</h1>
            </div>
            <div className="flex items-center gap-2">
              <a href="/OrgDashboard/Docs" className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md flex items-center gap-2"><BookOpen02Icon size={18}/> Docs</a>
              <button onClick={() => setShowCreate(true)} className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-md">Generate New Key</button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
            <p className="text-sm text-yellow-800 font-medium">Security Notice</p>
            <p className="text-xs text-yellow-700 mt-1">Secret API keys are only visible immediately after creation. If you lose a key, you must roll it. Do not share keys in client-side code or public repositories.</p>
          </div>

          <section className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Active Keys</h3>
              <p className="text-xs text-gray-500">Showing {keys.length} keys • {activeCount} active</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500">
                    <th className="py-2 pr-4">Key Name</th>
                    <th className="py-2 pr-4">Token Prefix</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Created</th>
                    <th className="py-2 pr-4">Last Used</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map(k => (
                    <tr key={k.id} className="border-t">
                      <td className="py-3 pr-4">
                        <p className="text-sm font-medium text-gray-800">{k.name}</p>
                        {k.note && <p className="text-xs text-gray-500">{k.note}</p>}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">{k.prefix}...</code>
                          <button onClick={() => copyPrefix(k.prefix)} className="p-1 rounded bg-gray-100"><LuCopy size={16}/></button>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 ${k.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-700"}`}>
                          <LuCircleCheck /> {k.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-sm text-gray-700">{k.created}</td>
                      <td className="py-3 pr-4 text-sm text-gray-700">{k.lastUsed}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => rotateKey(k.id)} className="p-2 rounded bg-gray-100"><LuRefreshCw size={16}/></button>
                          <button onClick={() => revokeKey(k.id)} className="p-2 rounded bg-gray-100"><LuTrash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Security Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <p className="text-sm font-semibold text-gray-800">Rotate Keys Periodically</p>
                <p className="text-xs text-gray-600 mt-1">Change keys every 90 days to minimize risk of compromised credentials.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <p className="text-sm font-semibold text-gray-800">Least Privilege</p>
                <p className="text-xs text-gray-600 mt-1">Create separate keys for services and environments. Limit access.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <p className="text-sm font-semibold text-gray-800">Keep Secrets Secret</p>
                <p className="text-xs text-gray-600 mt-1">Never commit keys to version control. Use environment variables instead.</p>
              </div>
            </div>
          </section>

          {showCreate && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
              <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
                <h4 className="text-lg font-semibold text-gray-800">Generate New Key</h4>
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-sm text-gray-700">Key Name</p>
                    <input value={newName} onChange={(e) => setNewName(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 outline-0" placeholder="Service or app name" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Environment</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button onClick={() => setNewEnv("live")} className={`px-3 py-2 rounded-md text-sm ${newEnv === "live" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"}`}>Production</button>
                      <button onClick={() => setNewEnv("test")} className={`px-3 py-2 rounded-md text-sm ${newEnv === "test" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"}`}>Development</button>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-end gap-2">
                  <button onClick={() => setShowCreate(false)} className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md">Cancel</button>
                  <button onClick={createKey} className="px-3 py-2 text-sm bg-black text-white rounded-md">Create Key</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default APIKeys;
