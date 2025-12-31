// src/services/auth.ts
import { api } from "./api";
import { saveTokens, clearTokens } from "../utils/storage";

export interface RegisterPayload {
  email: string;
  password: string;
  role?: string;
}

export interface VerifyOtpPayload {
  email: string;
  code: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// REGISTER
export const registerUser = async (payload: RegisterPayload) => {
  return api.post("/users/register", payload);
};

// VERIFY OTP
export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const res = await api.post("/users/verify-otp", payload);

  if (res.data.tokens) {
    saveTokens(res.data.tokens.access, res.data.tokens.refresh);
  }

  return res;
};

// REQUEST NEW OTP
export const requestOtp = async (email: string) => {
  return api.post("/users/request-otp", { email });
};

// LOGIN
export const loginUser = async (payload: LoginPayload) => {
  const res = await api.post("/users/login", payload);

  if (res.data.tokens) {
    saveTokens(res.data.tokens.access, res.data.tokens.refresh);
  }

  return res;
};

// LOGOUT
// LOGOUT
export const logoutUser = async () => {
  clearTokens();
  localStorage.removeItem("user");
  return true;
};
