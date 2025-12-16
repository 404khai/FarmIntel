import React, { useRef, useState } from "react";
import OrgDashboardNav from "../../components/OrgDashboardNav";
import OrgSideNav from "../../components/OrgSideNav";
import { AccountSetting02Icon, Key01Icon, Invoice03Icon, Notification02Icon, UserGroupIcon } from "hugeicons-react";
import { LuLogOut, LuImagePlus, LuTrash2, LuCheck } from "react-icons/lu";

const Settings: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [companyName, setCompanyName] = useState("GreenValley Cooperatives Ltd.");
  const [taxId, setTaxId] = useState("US-98234110");
  const [address, setAddress] = useState("1200 Harvest Way, Suite 4B\nSpringfield, IL 62704\nUnited States");
  const [contactName, setContactName] = useState("John Cooper");
  const [contactEmail, setContactEmail] = useState("john.cooper@greenvalley.co");
  const [contactPhone, setContactPhone] = useState("+1 (217) 555-0199");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };
  const removeLogo = () => setLogoPreview(null);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OrgSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <OrgDashboardNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-16 px-4 sm:px-6 md:px-8 pb-24 ml-0 md:ml-64 min-h-screen overflow-y-auto">
          <div className="grid grid-cols-12 gap-6">
            <aside className="col-span-12 lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-lime-50 text-lime-700">
                    <AccountSetting02Icon />
                    <span className="text-sm font-medium">Organization Profile</span>
                  </button>
                  <a href="/OrgDashboard/APIKeys" className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Key01Icon />
                    <span className="text-sm">API Settings</span>
                  </a>
                  <a href="/OrgDashboard/Billing" className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Invoice03Icon />
                    <span className="text-sm">Billing & Payments</span>
                  </a>
                  <a href="/notifications" className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Notification02Icon />
                    <span className="text-sm">Notifications</span>
                  </a>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <UserGroupIcon />
                    <span className="text-sm">Team Members</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50">
                    <LuLogOut />
                    <span className="text-sm">Log Out</span>
                  </button>
                </div>
              </div>
            </aside>

            <section className="col-span-12 lg:col-span-9 space-y-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">Organization Profile</h1>
                <p className="text-gray-500 mt-1">Manage your company details, branding, and contact information.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Branding</h3>
                <p className="text-sm text-gray-600">Update your organization’s logo and identity.</p>
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <LuImagePlus className="text-gray-400 text-2xl" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Recommended size 400x400px. JPG or PNG only.</div>
                    <div className="ml-auto flex items-center gap-3">
                      <button onClick={handleUploadClick} className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md">Upload new</button>
                      <button onClick={removeLogo} className="px-3 py-2 text-sm text-red-600">Remove</button>
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Company Details</h3>
                <p className="text-sm text-gray-600">Legal information used for billing and tax purposes.</p>
                <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-700">Company Name</p>
                      <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 outline-0" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Tax ID / VAT Number</p>
                      <input value={taxId} onChange={(e) => setTaxId(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 outline-0" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Registered Address</p>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={4} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 outline-0" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                <p className="text-sm text-gray-600">Primary contact for platform notifications.</p>
                <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-700">Contact Name</p>
                      <input value={contactName} onChange={(e) => setContactName(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 outline-0" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">Email Address</p>
                      <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 outline-0" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-700">Phone Number</p>
                      <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 outline-0" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t p-4 flex items-center justify-end gap-3">
            <button className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md">Cancel</button>
            <button className="px-3 py-2 text-sm bg-emerald-600 text-white rounded-md flex items-center gap-2"><LuCheck /> Save Changes</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
