import React, { useState } from "react";
import OrgDashboardNav from "../../components/OrgDashboardNav";
import { BookOpen02Icon, Search01Icon } from "hugeicons-react";

const Docs: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tab, setTab] = useState<"curl" | "node" | "python">("curl");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <OrgDashboardNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-16 px-4 sm:px-6 md:px-8 pb-10 ml-0 min-h-screen overflow-y-auto">
          <div className="mb-4">
            <a href="/OrgDashboard" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">Back to Dashboard</a>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen02Icon />
              <h1 className="text-2xl font-semibold text-gray-800">Introduction to FarmIntel API</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <Search01Icon size={18} />
                <input className="bg-transparent outline-0 w-56 text-sm" placeholder="Search documentation..." />
              </div>
              <a href="/OrgDashboard" className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md">Dashboard</a>
              <a href="/support" className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md">Support</a>
              <a href="/OrgDashboard/APIKeys" className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-md">Get API Key</a>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <aside className="col-span-12 lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Getting Started</p>
                  <div className="space-y-1">
                    <a className="block px-3 py-2 rounded-md bg-lime-50 text-lime-700" href="#intro">Introduction</a>
                    <a className="block px-3 py-2 rounded-md hover:bg-gray-50" href="#auth">Authentication</a>
                    <a className="block px-3 py-2 rounded-md hover:bg-gray-50" href="#errors">Errors</a>
                    <a className="block px-3 py-2 rounded-md hover:bg-gray-50" href="#limits">Rate Limits</a>
                  </div>

                  <p className="text-xs font-semibold uppercase text-gray-500 mt-4 mb-2">Resources</p>
                  <div>
                    <p className="px-3 py-2 text-gray-700 font-medium">Crops</p>
                    <div className="ml-2 space-y-1">
                      <a className="block px-3 py-2 rounded-md hover:bg-gray-50" href="#list-crops">List all crops</a>
                      <a className="block px-3 py-2 rounded-md hover:bg-gray-50" href="#get-crop">Get crop details</a>
                      <a className="block px-3 py-2 rounded-md hover:bg-gray-50" href="#update-availability">Update availability</a>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="px-3 py-2 text-gray-700 font-medium">Orders</p>
                  </div>
                  <div className="mt-3">
                    <p className="px-3 py-2 text-gray-700 font-medium">Inventory</p>
                  </div>

                  <div className="mt-6 p-3 bg-emerald-50 rounded-xl">
                    <p className="text-sm font-semibold text-emerald-700">Need help?</p>
                    <p className="text-xs text-emerald-700">Check support guides or contact our dev team.</p>
                    <a href="/support" className="mt-2 inline-block text-sm text-emerald-700">Contact Support →</a>
                  </div>
                </div>
              </div>
            </aside>

            <section className="col-span-12 lg:col-span-7 space-y-6">
              <div id="intro" className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-sm font-medium text-blue-800">Base URL</p>
                <code className="mt-2 block bg-white rounded-md px-3 py-2 text-sm text-gray-800">https://api.farmintel.com/v1</code>
              </div>

              <article id="list-crops" className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">List all crops</h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">GET</span>
                    <code className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">/crops</code>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Returns a paginated list of crops available in the network. Filter by category, season, or organic certification.</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Query Parameters</p>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <p className="font-medium text-gray-800">category</p>
                        <p className="text-gray-600">Filter by crop category (e.g., vegetable, fruit, grain).</p>
                      </li>
                      <li>
                        <p className="font-medium text-gray-800">organic</p>
                        <p className="text-gray-600">If true, only organically certified produce.</p>
                      </li>
                      <li>
                        <p className="font-medium text-gray-800">limit</p>
                        <p className="text-gray-600">Max results per page. Default 20, max 100.</p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <button onClick={() => setTab("curl")} className={`px-2 py-1 rounded ${tab === "curl" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>cURL</button>
                      <button onClick={() => setTab("node")} className={`px-2 py-1 rounded ${tab === "node" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>Node.js</button>
                      <button onClick={() => setTab("python")} className={`px-2 py-1 rounded ${tab === "python" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>Python</button>
                    </div>
                    <pre className="mt-2 bg-gray-900 text-gray-100 rounded-lg p-4 text-xs overflow-auto">
{tab === "curl" && `curl -X GET "https://api.farmintel.com/v1/crops" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"`}
{tab === "node" && `import axios from 'axios';
const res = await axios.get('https://api.farmintel.com/v1/crops', {
  headers: { Authorization: 'Bearer YOUR_API_KEY' }
});
console.log(res.data);`}
{tab === "python" && `import requests
r = requests.get('https://api.farmintel.com/v1/crops', headers={
  'Authorization': 'Bearer YOUR_API_KEY'
})
print(r.json())`}
                    </pre>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">Response 200 OK</p>
                  <pre className="bg-gray-100 rounded-lg p-4 text-xs overflow-auto">{`{
  "data": [
    {
      "id": "cr_12934",
      "name": "Roma Tomato",
      "category": "vegetable",
      "price_per_kg": 2.45,
      "available_quantity": 5000,
      "organic": true
    }
  ]
}`}</pre>
                </div>
              </article>

              <article id="get-crop" className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Get crop details</h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">GET</span>
                    <code className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">/crops/:id</code>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Fetch a single crop resource by ID.</p>
              </article>

              <article id="update-availability" className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Update availability</h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">PATCH</span>
                    <code className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">/crops/:id</code>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Update quantity or status for a crop.</p>
              </article>
            </section>

            <aside className="col-span-12 lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-20">
                <p className="text-xs font-semibold uppercase text-gray-500 mb-2">On this page</p>
                <div className="space-y-2 text-sm">
                  <a className="block text-gray-700 hover:text-lime-700" href="#list-crops">List all crops</a>
                  <a className="block text-gray-700 hover:text-lime-700" href="#get-crop">Create an order</a>
                  <a className="block text-gray-700 hover:text-lime-700" href="#update-availability">Response Object</a>
                  <a className="block text-gray-700 hover:text-lime-700" href="#errors">Error Codes</a>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
