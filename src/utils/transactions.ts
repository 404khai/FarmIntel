import { api } from "./api";
 
export interface Wallet {
  id: number;
  farmer: number;
  farmer_name: string;
  balance: string;
  updated_at: string;
}
 
export type TransactionType = "PAYMENT" | "PAYOUT" | "REFUND" | "TRANSFER";
export type TransactionStatus = "INITIALIZED" | "SUCCESS" | "FAILED" | "PENDING";
 
export interface Transaction {
  id: number;
  user: number;
  user_email: string;
  wallet: number | null;
  amount: string;
  reference: string;
  transaction_type: TransactionType;
  status: TransactionStatus;
  description?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}
 
export const getWallet = async (): Promise<Wallet> => {
  const res = await api.get("/transactions/wallet/");
  return res.data;
};
 
export const getTransactionHistory = async (): Promise<Transaction[]> => {
  const res = await api.get("/transactions/history/");
  return res.data;
};
