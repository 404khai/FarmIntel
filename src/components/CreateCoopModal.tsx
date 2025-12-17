import React, { useState } from "react";
import { createCooperative } from "../utils/coops";
import toast from "react-hot-toast";
import { LuImagePlus, LuX } from "react-icons/lu";

interface CreateCoopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCoopModal: React.FC<CreateCoopModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal is closed (optional, but good UX)
  // For simplicity, we just clear on successful create or manual clear.

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Cooperative name is required");
      return;
    }
    if (!selectedFile) {
        toast.error("Please select a cover image");
        return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image_url", selectedFile);

      await createCooperative(formData);
      toast.success("Cooperative created successfully!");
      
      // Cleanup
      setName("");
      setDescription("");
      setSelectedFile(null);
      setPreviewUrl(null);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create cooperative");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999] p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Create New Cooperative
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <LuX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Coop Cover Image</label>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden group">
                 {previewUrl ? (
                   <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                 ) : (
                   <LuImagePlus className="text-gray-400 group-hover:text-gray-600 transition" size={24} />
                 )}
                 <input 
                   type="file" 
                   accept="image/*" 
                   className="absolute inset-0 opacity-0 cursor-pointer" 
                   onChange={handleFileChange}
                 />
              </div>
              <div className="flex-1">
                 <p className="text-xs text-gray-500 mb-2">Upload a logo or representative image for your cooperative.</p>
                 <button className="text-xs text-lime-600 font-medium hover:underline" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>
                    Click to upload
                 </button>
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="e.g. Green Valley Farmers"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              placeholder="Briefly describe the goals of this coop..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreate}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-lime-600 text-white hover:bg-lime-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create Cooperative"}
          </button>
        </div>
      </div>
    </div>
  );
};
