import { api } from "./api";
import type { Crop } from "./crops";
import type { UserPayload } from "./user";
import { getStoredUser } from "./user";

export interface Cooperative {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  created_at?: string;
  created_by?: number;
}

export interface CooperativeMember {
  id: number;
  user: UserPayload;
  role: "owner" | "member_farmer" | "member_buyer" | string;
  joined_at: string;
  status: string;
}

// Detailed member info serializer contract
export interface CooperativeMemberDetail {
  id: number;
  profile_pic_url: string | null;
  full_name: string;
  member_id: string;
  role?: string;
  role_display: string;
  location: string;
  city?: string;
  state?: string;
  business_name: string;
  email: string;
  phone: string;
  status: string;
  user_role?: string;
  crops?: Crop[];
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

export const fetchCooperativeMembersDetail = async (coopId: number): Promise<CooperativeMemberDetail[]> => {
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

export const joinCooperative = async (id: number): Promise<CooperativeMember> => {
  const res = await api.post(`/cooperatives/${id}/join/`);
  return res.data;
};

export const isCoopOwner = async (coopId: number): Promise<boolean> => {
  try {
    const currentUserId = getStoredUser()?.id;
    if (!currentUserId) return false;
    const coop = await fetchCooperative(coopId);
    return coop.created_by === currentUserId;
  } catch {
    return false;
  }
};
