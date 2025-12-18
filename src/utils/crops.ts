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
}

export const fetchCrops = async (): Promise<Crop[]> => {
  const res = await api.get("/crops/");
  return res.data; // Assuming backend returns a list of crops directly or paginated. 
                   // If paginated, might need res.data.results. 
                   // Sticking to res.data for now based on typical prompts.
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
