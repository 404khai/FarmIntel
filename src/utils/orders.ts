import { api } from "./api";
import type { Crop } from "./crops";
import type { UserPayload } from "./user";

export interface Order {
  id: number;
  buyer: UserPayload | number; // Depending on how the backend returns it (nested or ID)
  farmer: UserPayload | number;
  crop: Crop | number;
  crop_details?: Crop;
  buyer_details?: UserPayload;
  farmer_details?: {
    full_name: string;
    farm_name: string;
    profile_pic_url: string;
    email: string;
    phone: string;
    city: string;
    state: string;
  };
  cooperative?: number;
  quantity: string; // DecimalField often returns as string
  total_price: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELLED";
  delivery_address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderTransaction {
  id: number;
  order: number;
  buyer: number;
  reference: string;
  amount: string;
  status: "INITIALIZED" | "SUCCESS" | "FAILED";
  paystack_response: any;
  created_at: string;
  verified_at?: string;
}

export const placeOrder = async (cropId: number, quantity: number): Promise<Order> => {
  const res = await api.post("/orders/place/", {
    crop: cropId,
    quantity: quantity,
  });
  return res.data;
};

export const listOrders = async (): Promise<Order[]> => {
  const res = await api.get("/orders/list/");
  return res.data;
};

export const updateOrderAction = async (orderId: number, action: "accept" | "decline"): Promise<Order> => {
  const res = await api.post(`/orders/${orderId}/action/`, {
    action: action,
  });
  return res.data;
};

export const initializePayment = async (orderId: number, callbackUrl: string): Promise<{ authorization_url: string; access_code: string; reference: string }> => {
  const res = await api.post(`/orders/${orderId}/pay/initialize/`, {
    callback_url: callbackUrl,
  });
  return res.data; // Assuming it returns the paystack data directly or nested
};

export const verifyPayment = async (reference: string): Promise<OrderTransaction> => {
  const res = await api.post("/orders/pay/verify/", {
    reference: reference,
  });
  return res.data;
};
