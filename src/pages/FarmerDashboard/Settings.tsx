import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/DashboardNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import BackToDashboardPill from "../../components/BackToDashboardPill";
import avatar from "../../assets/avatar.jpeg";
import { AccountSetting02Icon, Notification02Icon, Plant02Icon, Invoice03Icon } from "hugeicons-react";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { fetchCurrentUser, updateUserProfile, type UserPayload } from "../../utils/user";
import toast, { Toaster } from "react-hot-toast";

const Settings: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);
  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);


  // Extended type to handle flattened form fields
  interface SettingsFormData extends Partial<UserPayload> {
    farm_name?: string;
    bio?: string;
    firstname?: string; // Handle potential legacy field if needed, mostly for type safety in destruct
  }

  const [formData, setFormData] = useState<SettingsFormData>({});

  useEffect(() => {
    // Try to get fresh user data on mount
    fetchCurrentUser().then(user => {
       if (user) {
         setUser(user);
         // Flatten the nested data for the form
         setFormData({
            ...user,
            farm_name: user?.farmer?.farm_name || user?.farm_name,
            bio: user?.farmer?.about || user?.bio
         });
       }
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
       const base64String = reader.result as string; 
       // Depending on backend, we might send base64 or upload via FormData.
       // Assuming backend accepts base64 in profile_pic field or separate endpoint.
       // If backend needs FormData, we should use a different strategy.
       // For now, let's assume we update the local preview and send base64 or file content.
       
       // Strategy: Send base64 if backend supports it in JSON payload
       // Or create a FormData object if not.
       // Let's try sending it as part of the update payload if supported, 
       // but typically file uploads need multipart/form-data.
       
       // We will modify updateUserProfile to handle potential file uploads if needed,
       // or just call a separate upload endpoint.
       
       // For this implementation, I will assume we send the base64 string 
       // as "profile_pic" in the JSON payload, which is a common simple pattern.
       // If that fails, we can switch to FormData.
       
       setFormData(prev => ({ ...prev, profile_pic_url: base64String }));
       
       // Auto-save or wait for save button? 
       // User "when I press Change picture" implies immediate action or selection.
       // Let's just update state for now and let save handle it, 
       // OR trigger an immediate upload if desired. 
       // The prompt says "when save changes button is pressed...", so we just set state.
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Construct payload matching strictly what API likely expects
      // We map the flat form state back to the nested structure for the backend
      // We also exclude 'firstname' which is a legacy field not in UserPayload
      const { farm_name, bio, firstname, ...rest } = formData;
      
      const payload: Partial<UserPayload> = {
        ...rest,
        // Ensure email and other top level fields are included if modified
        email: formData.email, 
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        profile_pic_url: formData.profile_pic_url,
        
        // Nested farmer data
        farmer: {
          farm_name: farm_name,
          about: bio
        }
      };

      const updatedUser = await updateUserProfile(payload);
      setUser(updatedUser);
      toast.success("Profile updated successfully");
      
      // Update form data to reflect what came back from server to ensure sync
      const newFormState: SettingsFormData = {
        ...updatedUser,
        farm_name: updatedUser?.farmer?.farm_name || updatedUser?.farm_name,
        bio: updatedUser?.farmer?.about || updatedUser?.bio
      };
      setFormData(newFormState);

    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please check your inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <DashboardNav />
        <Toaster position="top-right" />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 h-screen overflow-y-auto`}>
          <div className="mb-4">
            <BackToDashboardPill to="/FarmerDashboard" />
          </div>
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Home", to: "/Home" }, { label: "Dashboard", to: "/FarmerDashboard" }, { label: "Settings" }]} />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Account Settings</h1>
            <p className="text-gray-500 mt-1">Manage your profile information, farm details, and platform preferences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-lime-50 text-lime-700">
                    <AccountSetting02Icon />
                    <span className="text-sm font-medium">Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Plant02Icon />
                    <span className="text-sm">Farm Details</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Notification02Icon />
                    <span className="text-sm">Notifications</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <span className="text-sm">Security</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Invoice03Icon />
                    <span className="text-sm">Billing & Plan</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50">
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-6">
              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Public Profile</h2>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Visible to Coop Members</span>
                </div>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <div className="sm:col-span-2 flex items-center gap-4">
                    <div className="relative group">

                      <img 
                        src={formData.profile_pic_url || user?.profile_pic_url || avatar} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full object-cover border cursor-pointer group-hover:opacity-75"
                        onClick={() => document.getElementById('profile-upload')?.click()}
                      />
                      <input 
                        type="file" 
                        id="profile-upload" 
                        className="hidden" 
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                      />
                    </div>
                    <div>
                      <button 
                        type="button" 
                        className="text-sm text-lime-600 font-medium hover:text-lime-700" 
                        onClick={() => document.getElementById('profile-upload')?.click()}
                      >
                        Change Picture
                      </button>
                      <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">First Name</label>
                    <input 
                      name="first_name"
                      className="mt-1 w-full border rounded-md px-3 py-2" 
                      value={formData.first_name || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Last Name</label>
                    <input 
                      name="last_name"
                      className="mt-1 w-full border rounded-md px-3 py-2" 
                      value={formData.last_name || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Farm Name</label>
                    <input 
                      name="farm_name"
                      className="mt-1 w-full border rounded-md px-3 py-2" 
                      value={formData.farm_name || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email Address</label>
                    <input 
                      name="email"
                      type="email" 
                      className="mt-1 w-full border rounded-md px-3 py-2" 
                      value={formData.email || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone Number</label>
                    <input 
                      name="phone"
                      className="mt-1 w-full border rounded-md px-3 py-2" 
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Country</label>
                    <div className="mt-1">
                      <CountrySelect 
                        onChange={(e: any) => {
                          setCountryId(e.id);
                          setFormData(prev => ({ ...prev, country: e.name }));
                        }} 
                        placeHolder={formData.country || "Select Country"} 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">State</label>
                    <div className="mt-1">
                      <StateSelect 
                        countryid={countryId} 
                        onChange={(e: any) => {
                          setStateId(e.id);
                          setFormData(prev => ({ ...prev, state: e.name }));
                        }} 
                        placeHolder={formData.state || "Select State"} 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">City</label>
                    <div className="mt-1">
                      <CitySelect 
                        countryid={countryId} 
                        stateid={stateId} 
                        onChange={(e: any) => {
                          setFormData(prev => ({ ...prev, city: e.name }));
                        }}
                        placeHolder={formData.city || "Select City"} 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Role</label>
                    <select 
                      name="role"
                      disabled
                      className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-50"
                      value={formData.role || "farmer"}
                      onChange={handleInputChange}
                    >
                      <option value="farmer">Farmer</option>
                      <option value="org">Coop Admin</option>
                      <option value="buyer">Buyer</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-600">Bio / Farm Description</label>
                    <textarea 
                      name="bio"
                      rows={4} 
                      className="mt-1 w-full border rounded-md px-3 py-2" 
                      placeholder="Tell others about your farm" 
                      value={formData.bio || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-end gap-3">
                    <button type="button" className="px-4 py-2 rounded-md border" onClick={() => window.location.reload()}>Cancel</button>
                    <button type="submit" disabled={isLoading} className="px-4 py-2 bg-lime-600 text-white rounded-md disabled:bg-lime-400">
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">General Preferences</h2>
                <div className="divide-y">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Language</p>
                      <p className="text-xs text-gray-500">Select your preferred language for the interface.</p>
                    </div>
                    <select className="border rounded-md px-3 py-2">
                      <option>English (US)</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Time Zone</p>
                      <p className="text-xs text-gray-500">Ensure your notification timestamps are accurate.</p>
                    </div>
                    <select className="border rounded-md px-3 py-2">
                      <option>(GMT+01:00) West Africa</option>
                      <option>(GMT-06:00) Central</option>
                    </select>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Measurement Units</p>
                      <p className="text-xs text-gray-500">Choose units for crop yield and land area.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 rounded-md border bg-gray-50">Metric</button>
                      <button className="px-3 py-1 rounded-md border">Imperial</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-red-50 p-6 rounded-2xl border border-red-200">
                <h2 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h2>
                <p className="text-xs text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700">Delete Account</p>
                    <p className="text-xs text-red-600">Permanently remove your account and all associated data.</p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md">Delete Account</button>
                </div>
              </section>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Settings;
