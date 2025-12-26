import React, { useRef, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import { LuTriangleAlert, LuCircleCheck, LuHeart, LuImagePlus } from "react-icons/lu";
import Breadcrumbs from "../../components/Breadcrumbs";


import { detectDisease, type DetectionResult } from "../../utils/detector";
import toast, { Toaster } from "react-hot-toast";

const Detection: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("farmerSidebarCollapsed") === "true";
  });
  
  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const newState = !prev;
      localStorage.setItem("farmerSidebarCollapsed", String(newState));
      return newState;
    });
  };

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const data = await detectDisease(selectedFile);
      setResult(data);
      toast.success("Analysis complete!");
    } catch (e) {
      console.error(e);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  };
  

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
          onToggleCollapse={handleToggleCollapse}
        />
        <Toaster position="top-right" />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} h-screen overflow-y-auto`}>
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/Home" },
                { label: "Dashboard", to: "/FarmerDashboard" },
                { label: "Disease Control" },
              ]}
            />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Disease & Pest Control</h1>
            <p className="text-gray-500 mt-1">Monitor crop health, analyze threats with AI, and track treatments to ensure a bountiful harvest.</p>
          </div>

          <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Instant Diagnosis</h2>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const f = e.dataTransfer.files?.[0];
                if (f) {
                  setSelectedFile(f);
                  setPreviewUrl(URL.createObjectURL(f));
                  setResult(null);
                }
              }}
              className={`border-2 border-dashed rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center ${dragActive ? "border-lime-500 bg-lime-50" : "border-gray-200"}`}
            >
              {previewUrl ? (
                <div className="w-full max-w-[800px] flex flex-col items-center">
                  <img src={previewUrl} alt="preview" className="w-full max-h-80 object-contain rounded-lg mb-4" />
                  
                  {result ? (
                    <div className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100 text-left">
                       <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-gray-800">Result: <span className="text-lime-600">{result.prediction.label.replace(/_/g, " ")}</span></h3>
                          <span className="text-sm px-3 py-1 bg-lime-100 text-lime-700 rounded-full font-medium">{(result.prediction.confidence * 100).toFixed(1)}% Confidence</span>
                       </div>
                       
                       {result.alternatives && result.alternatives.length > 0 && (
                         <div className="mt-3">
                           <p className="text-sm font-medium text-gray-600 mb-1">Other possibilities:</p>
                           <ul className="space-y-1">
                             {result.alternatives.map((c, idx) => (
                               <li key={idx} className="text-sm text-gray-500 flex justify-between w-full max-w-xs">
                                 <span>{c.label.replace(/_/g, " ")}</span>
                                 <span>{(c.confidence * 100).toFixed(1)}%</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                       )}

                       {result.treatment && (
                         <div className="mt-4 p-4 bg-lime-50 rounded-lg border border-lime-100">
                            <h4 className="font-semibold text-lime-800 mb-2 flex items-center gap-2">
                              <LuHeart className="text-lime-600" /> Recommended Treatment
                            </h4>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                              {typeof result.treatment === 'string' ? result.treatment : result.treatment.treatment_plan}
                            </p>
                         </div>
                       )}

                       <div className="mt-4 flex gap-3">
                         <button onClick={clearSelection} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">Analyze Another</button>
                       </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button onClick={clearSelection} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">Cancel</button>
                      <button 
                        onClick={handleAnalyze} 
                        disabled={isAnalyzing}
                        className={`px-4 py-2 bg-lime-600 text-white rounded-lg text-sm flex items-center gap-2 ${isAnalyzing ? "opacity-70 cursor-not-allowed" : "hover:bg-lime-700"}`}
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <LuImagePlus className="text-lime-600 text-4xl mb-3" />
                  <p className="text-sm text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG (max. 800×400px)</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 px-4 py-2 bg-lime-600 text-white rounded-md"
                  >
                    Select image
                  </button>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setSelectedFile(f);
                  setPreviewUrl(f ? URL.createObjectURL(f) : null);
                  setResult(null);
                }}
                className="hidden"
              />
            </div>
          </section>



          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Detections</h3>
                  <button className="text-sm text-lime-600">View All</button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Early Blight", crop: "Tomato", sector: "Sector 4", confidence: 96, risk: "High" },
                    { title: "Fall Armyworm", crop: "Maize", sector: "Sector 2", confidence: 93, risk: "Medium" },
                    { title: "Healthy Crop", crop: "Spinach", sector: "Sector 1", confidence: 99, risk: "Safe" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-16 h-16 rounded-lg bg-gray-200" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-800">{item.title}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${item.risk === "High" ? "bg-red-100 text-red-600" : item.risk === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-emerald-100 text-emerald-700"}`}>{item.risk} Risk</span>
                        </div>
                        <p className="text-xs text-gray-600">Detected in {item.crop} ({item.sector}) • {item.confidence}% Confidence</p>
                        <button className="mt-2 text-xs text-lime-600">See Recommendations →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">Active Community Alerts</h3>
                  <button className="text-sm text-lime-600">View Map</button>
                </div>
                <div className="p-4 bg-red-50 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700">Locust Swarm Reported</p>
                    <p className="text-xs text-red-600">5km away • High potential for crop damage</p>
                  </div>
                  <button className="px-3 py-2 text-xs bg-red-600 text-white rounded-md">View Details</button>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommended Actions</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-emerald-50 rounded-xl">
                    <p className="text-sm font-medium text-emerald-700">Apply Neem Oil Spray</p>
                    <p className="text-xs text-emerald-600">Based on Fall Armyworm detection in Sector 2.</p>
                    <button className="mt-2 px-3 py-1 text-xs bg-emerald-600 text-white rounded">Log Application</button>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm font-medium text-blue-700">Inspect Potato Leaves</p>
                    <p className="text-xs text-blue-600">Weather conditions favor Early Blight spread this week.</p>
                    <button className="mt-2 px-3 py-1 text-xs bg-blue-600 text-white rounded">Schedule Check</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">Threat Library</h3>
                  <button className="text-sm text-lime-600">View All</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Fall Armyworm", level: "High" },
                    { name: "Powdery Mildew", level: "Medium" },
                    { name: "Leaf Miners", level: "Low" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${t.level === "High" ? "bg-red-200" : t.level === "Medium" ? "bg-yellow-200" : "bg-emerald-200"}`} />
                        <p className="text-sm font-medium text-gray-700">{t.name}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${t.level === "High" ? "bg-red-100 text-red-600" : t.level === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-emerald-100 text-emerald-700"}`}>{t.level} Risk</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Detection;
