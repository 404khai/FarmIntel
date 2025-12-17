import { api } from "./api";

export interface DetectionResult {
  status: string;
  prediction: {
    label: string;
    confidence: number;
  };
  alternatives?: Array<{
    label: string;
    confidence: number;
  }>;
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
