import { api } from "./api";
import type { UserPayload } from "./user";

export interface Cooperative {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  created_at?: string;
}

export interface CooperativeMember {
  id: number;
  user: UserPayload;
  role: "owner" | "member_farmer" | "member_buyer" | string;
  joined_at: string;
  status: string;
}

export const fetchCooperatives = async (): Promise<Cooperative[]> => {
  const res = await api.get("/cooperatives/");
  return res.data;
};

export const fetchCooperative = async (id: number): Promise<Cooperative> => {
  const res = await api.get(`/cooperatives/${id}/`);
  return res.data;
};

export const fetchCooperativeMembers = async (coopId: number): Promise<CooperativeMember[]> => {
  const res = await api.get(`/cooperatives/${coopId}/members/`);
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
