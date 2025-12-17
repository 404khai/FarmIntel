import { api } from "./api";

export interface Cooperative {
  id: number;
  name: string;
  description: string;
  img: string | null;
  created_at?: string;
}

export const fetchCooperatives = async (): Promise<Cooperative[]> => {
  const res = await api.get("/cooperatives/");
  return res.data;
};

export const fetchCooperative = async (id: number): Promise<Cooperative> => {
  const res = await api.get(`/cooperatives/${id}/`);
  return res.data;
};

export const createCooperative = async (data: FormData): Promise<Cooperative> => {
  const res = await api.post("/cooperatives/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateCooperative = async (id: number, data: FormData): Promise<Cooperative> => {
  const res = await api.patch(`/cooperatives/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteCooperative = async (id: number): Promise<void> => {
  await api.delete(`/cooperatives/${id}/`);
};

export const joinCooperative = async (id: number): Promise<void> => {
  await api.post(`/cooperatives/${id}/join/`);
};
