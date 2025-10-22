import React, { useEffect, useState, useMemo } from "react";
import DashboardNav from "../components/DashboardNav";
import FarmerSideNav from "../components/FarmerSideNav";
import toast from "react-hot-toast";
import {
  LuStethoscope,
  LuSyringe,
  LuScissors,
  LuSlice,
  LuTriangleAlert,
  LuPill,
  LuMessageSquareText,
} from "react-icons/lu";

type Pet = {
  id: number;
  name: string;
  species?: string;
  imageUrl?: string | null;
};

type Vet = {
  id: number;
  userId: number;
  specialization?: string;
  imageUrl?: string | null;
  user: { name: string; imageUrl?: string | null };
};

type Appointment = {
  id: number;
  pet?: Pet;
  vet?: Vet;
  scheduledDate: string;
  scheduledTime: string;
  appointmentType: string;
  status: string;
};

// 🧠 Appointment type pill styling (like Appointments page)
const appointmentTypes = [
  { type: "Checkup", color: "text-blue-600", icon: <LuStethoscope className="text-[22px] text-blue-600 bg-blue-200 rounded-full p-1" /> },
  { type: "Vaccination", color: "text-green-600", icon: <LuSyringe className="text-[22px] text-green-600 bg-green-200 rounded-full p-1"/> },
  { type: "Grooming", color: "text-pink-600", icon: <LuScissors className="text-[22px] text-pink-600 bg-pink-200 rounded-full p-1"/> },
  { type: "Surgery", color: "text-red-600", icon: <LuSlice className="text-[22px] text-red-600 bg-red-200 rounded-full p-1" /> },
  { type: "Emergency Care", color: "text-orange-600", icon: <LuTriangleAlert className="text-[22px] text-orange-600 bg-orange-200 rounded-full p-1"/> },
  { type: "Treatment", color: "text-yellow-600", icon: <LuPill className="text-[22px] text-yellow-600 bg-yellow-200 rounded-full p-1" /> },
  { type: "Consultation", color: "text-purple-600", icon: <LuMessageSquareText className="text-[22px] text-purple-600 bg-purple-200 rounded-full p-1" /> },
];

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

const FarmerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [petRes, apptRes] = await Promise.all([
          api.get<Pet[]>("/petowners/pets"),
          api.get<Appointment[]>("/appointments/get_appointments"),
        ]);
        setPets(petRes.data || []);
        setAppointments(apptRes.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const upcomingAppointments = useMemo(
    () => appointments.filter((a) => a.status === "ACCEPTED"),
    [appointments]
  );

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Jane";

  const renderTypeLabel = (typeName: string) => {
    const t = appointmentTypes.find((x) => x.type === typeName);
    if (!t)
      return (
        <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-600">
          {typeName}
        </span>
      );
    return (
      <span className="inline-flex items-center gap-2 py-1 rounded-full bg-gray-50">
        {t.icon}
        <span className="text-sm font-medium text-gray-700">{t.type}</span>
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <FarmerSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-20 px-6 ml-60 sm:px-8 pb-10">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">Hi, {firstName}</h1>
              <p className="text-gray-500 mt-1">
                Here’s a quick overview of your pets and upcoming appointments.
              </p>
            </div>

            {/* Pets Section */}
            <section className="bg-white shadow-sm rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Pets</h2>

              {loading ? (
                <p className="text-gray-500">Loading your pets...</p>
              ) : pets.length === 0 ? (
                <p className="text-gray-500 italic">
                  You have no registered pets yet.
                </p>
              ) : (
                <div className="flex flex-wrap gap-6">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="flex flex-col items-center bg-gray-100 rounded-xl p-4 w-40 hover:shadow-md transition"
                    >
                      <Avatar name={pet.name} imageUrl={pet.imageUrl ?? null} size={70} />
                      <h3 className="mt-2 text-base font-medium text-gray-800">
                        {pet.name}
                      </h3>
                      <p className="text-sm text-gray-500">{pet.species}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Upcoming Appointments */}
            <section className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Upcoming Appointments
                </h2>
              </div>

              {loading ? (
                <p className="text-gray-500">Loading appointments...</p>
              ) : upcomingAppointments.length === 0 ? (
                <p className="text-gray-500 italic">
                  No upcoming appointments found.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                      <tr>
                        <th className="py-3 px-4">Pet</th>
                        <th className="py-3 px-4">Vet</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {upcomingAppointments.map((a) => (
                        <tr key={a.id} className="hover:bg-gray-50 transition">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar
                                name={a.pet?.name}
                                imageUrl={a.pet?.imageUrl ?? null}
                                size={44}
                              />
                              <div>
                                <div className="font-medium text-gray-800">
                                  {a.pet?.name || "—"}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {a.pet?.species || ""}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar
                                name={a.vet?.user?.name}
                                imageUrl={a.vet?.user?.imageUrl ?? null}
                                size={44}
                              />
                              <div>
                                <div className="font-medium text-gray-800">
                                  {a.vet?.user?.name || "—"}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {a.vet?.specialization || ""}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">{renderTypeLabel(a.appointmentType)}</td>
                          <td className="py-3 px-4 text-gray-700">
                            {a.scheduledDate}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {a.scheduledTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
