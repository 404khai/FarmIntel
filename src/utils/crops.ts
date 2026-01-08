import { api } from "./api";

export interface Crop {
  id: number;
  name: string;
  variety: string;
  quantity_kg: number;
  harvest_date: string;
  status: string;
  image_url?: string | null;
  price_per_kg?: number;
  farmer?: number | { id: number; [key: string]: any };
}

export const fetchCrops = async (): Promise<Crop[]> => {
  const res = await api.get("/crops/");
  return res.data; 
};

export const createCrop = async (data: FormData): Promise<Crop> => {
  const res = await api.post("/crops/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateCrop = async (id: number, data: FormData): Promise<Crop> => {
  const res = await api.patch(`/crops/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteCrop = async (id: number): Promise<void> => {
  await api.delete(`/crops/${id}/`);
};

// Mock function to fetch crops for a specific farmer (since backend might not have this public endpoint yet)
export const fetchCropsByFarmerId = async (farmerId: number): Promise<Crop[]> => {
    try {
        const res = await api.get(`/crops/?user=${farmerId}`);
        return res.data;
    } catch (error: any) {
        // If filtering by user is forbidden (e.g. for buyers), fetch all public crops and filter client-side
        if (error.response && error.response.status === 403) {
            console.warn("Direct user filtering forbidden, falling back to client-side filtering.");
            const allCrops = await fetchCrops();
            return allCrops.filter(crop => {
                if (typeof crop.farmer === 'number') {
                    return crop.farmer === farmerId;
                } else if (crop.farmer && typeof crop.farmer === 'object' && 'id' in crop.farmer) {
                    return crop.farmer.id === farmerId;
                }
                return false;
            });
        }
        throw error;
    }
};
