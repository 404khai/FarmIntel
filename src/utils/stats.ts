import { api } from "./api";

export interface FarmerStats {
  location: {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  stats: {
    temperature: number;
    soil_moisture: number;
    expected_rainfall: number;
  };
  unit_details: {
    temperature: string;
    soil_moisture: string;
    precipitation: string;
  };
}

export const fetchFarmerStats = async (): Promise<FarmerStats | null> => {
  try {
    const res = await api.get("/analytics/farmer-stats");
    return res.data;
  } catch (error) {
    console.error("Error fetching farmer stats:", error);
    return null;
  }
};
