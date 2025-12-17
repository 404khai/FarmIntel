import { api } from "./api";

export interface DetectionResult {
  disease: string;
  confidence: number;
  candidates?: Array<{ label: string; score: number }>;
}

export const detectDisease = async (image: File): Promise<DetectionResult> => {
  const formData = new FormData();
  formData.append("image", image);

  const res = await api.post("/detector/detect", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
