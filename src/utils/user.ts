import { api } from "./api";

export interface UserPayload {
  id?: number;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  profile_pic?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  is_verified?: boolean;
  role?: "farmer" | "buyer" | "org" | "admin";
  name?: string;
  firstname?: string;
}

export const setStoredUser = (user: UserPayload) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getStoredUser = (): UserPayload | null => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getFirstName = (u?: UserPayload | null): string => {
  const user = u ?? getStoredUser();
  const fromModel = user?.first_name ?? user?.firstname;
  if (fromModel && fromModel.trim()) return fromModel.trim();
  if (user?.name) return user.name.split(" ")[0];
  if (user?.email) return user.email.split("@")[0];
  return "Farmer";
};

export const getFullName = (u?: UserPayload | null): string => {
  const user = u ?? getStoredUser();
  const first = (user?.first_name || "").trim();
  const last = (user?.last_name || "").trim();
  const full = `${first} ${last}`.trim();
  return full || user?.name || user?.email || "User";
};

export const getEmail = (u?: UserPayload | null): string => {
  const user = u ?? getStoredUser();
  return user?.email || "";
};

export const getAvatarUrl = (u?: UserPayload | null): string | null => {
  const user = u ?? getStoredUser();
  return user?.profile_pic || null;
};

export const fetchCurrentUser = async (): Promise<UserPayload | null> => {
  try {
    const res = await api.get("/users/me");
    const user = res?.data?.user || res?.data;
    if (user) setStoredUser(user);
    return user || null;
  } catch {
    return getStoredUser();
  }
};
