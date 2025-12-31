import React, { useEffect, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import BuyerSideNav from "../../components/BuyerSideNav";
import BackToDashboardPill from "../../components/BackToDashboardPill";
import avatar from "../../assets/avatar.jpeg";
import { AccountSetting02Icon, Notification02Icon, Invoice03Icon } from "hugeicons-react";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { fetchCurrentUser, updateUserProfile, type UserPayload, getStoredUser } from "../../utils/user";
import toast from "react-hot-toast";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const BuyerSettings: React.FC = () => {
  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  interface SettingsFormData extends Partial<UserPayload> {
    firstname?: string;
  }

  const [formData, setFormData] = useState<SettingsFormData>(() => {
    const stored = getStoredUser();
    if (!stored) return {};
    return {
      ...stored,
      firstname: stored?.first_name || (stored as any)?.firstname
    };
  });

  useEffect(() => {
    fetchCurrentUser().then(user => {
      if (user) {
        setFormData({
          ...user
        });
      }
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { firstname, ...rest } = formData;
      const payload: Partial<UserPayload> = {
        ...rest,
        email: formData.email, 
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        country: formData.country,
        state: formData.state,
        city: formData.city,
      };

      if (payload.profile_pic_url && (payload.profile_pic_url.startsWith('data:') || payload.profile_pic_url.startsWith('blob:'))) {
        delete payload.profile_pic_url;
      }

      await updateUserProfile(payload);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <BuyerSideNav isOpen={false} onClose={() => {}} />
      <div className="flex-1 flex flex-col">
        <DashboardNav />
        <main className="pt-20 px-4 sm:px-6 md:px-8 pb-24 ml-0 md:ml-64 min-h-screen overflow-y-auto">
          <div className="mb-4">
            <BackToDashboardPill to="/BuyerDashboard" />
          </div>

          <section className="bg-white rounded-2xl shadow-sm p-5 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><AccountSetting02Icon /> Account Settings</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Buyer Profile</span>
            </div>
            <p className="text-xs text-gray-500">Manage your profile and contact information used for orders and RFQs.</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3">
                  <img src={formData.profile_pic_url || avatar} alt="Avatar" className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{formData.first_name || formData.name || "Buyer"}</p>
                    <p className="text-xs text-gray-600">{formData.email}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <button className="w-full text-left text-sm px-3 py-2 rounded-md bg-gray-50">Profile</button>
                  <button className="w-full text-left text-sm px-3 py-2 rounded-md">Notifications</button>
                  <button className="w-full text-left text-sm px-3 py-2 rounded-md">Security</button>
                  <button className="w-full text-left text-sm px-3 py-2 rounded-md">Billing & Plan</button>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-9 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-md font-semibold text-gray-800 mb-3">Contact Information</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <label className="text-sm text-gray-600">Email Address</label>
                    <input 
                      name="email"
                      type="email" 
                      className="mt-1 w-full border rounded-md px-3 py-2" 
                      value={formData.email || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">Phone Number</label>
                    <div className="phone-input-container">
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="NG"
                        placeholder="Enter phone number"
                        value={formData.phone || ""}
                        onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
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
                  <div className="sm:col-span-2 flex items-center justify-end gap-3">
                    <button type="button" className="px-4 py-2 rounded-md border" onClick={() => window.location.reload()}>Cancel</button>
                    <button type="submit" disabled={isLoading} className="px-4 py-2 bg-lime-600 text-white rounded-md disabled:bg-lime-400">
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-md font-semibold text-gray-800 mb-3">Notifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 text-sm">
                    <input type="checkbox" defaultChecked className="accent-lime-600" />
                    Email notifications for messages
                  </label>
                  <label className="flex items-center gap-3 text-sm">
                    <input type="checkbox" defaultChecked className="accent-lime-600" />
                    Order updates and delivery alerts
                  </label>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-md font-semibold text-gray-800 mb-3">Billing & Plan</h3>
                <p className="text-xs text-gray-600">Manage your subscription and payment methods.</p>
                <div className="mt-3 flex items-center gap-2">
                  <Invoice03Icon />
                  <span className="text-sm">Current plan: Free</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerSettings;
