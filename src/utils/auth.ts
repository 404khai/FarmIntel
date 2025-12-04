// src/services/auth.ts
import { api } from "./api";
import { saveTokens } from "../utils/storage";

export interface RegisterPayload {
  email: string;
  password: string;
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

// VERIFY OTP (also saves tokens)
export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const res = await api.post("/users/verify-otp", payload);

  if (res.data.tokens) {
    saveTokens(res.data.tokens.access, res.data.tokens.refresh);
  }

  return res;
};

// REQUEST OTP AGAIN
export const requestOtp = async (email: string) => {
  return api.post("/users/request-otp", { email });
};

// LOGIN (saves tokens)
export const loginUser = async (payload: LoginPayload) => {
  const res = await api.post("/users/login", payload);

  if (res.data.tokens) {
    saveTokens(res.data.tokens.access, res.data.tokens.refresh);
  }

  return res;
};
