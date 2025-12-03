"use client";
import React, { useState } from "react";

interface CreateCoopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCoopModal: React.FC<CreateCoopModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000052] bg-opacity-10 flex justify-center items-center z-[999]">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create New Cooperative
        </h2>

        <input
          type="text"
          placeholder="Cooperative Name"
          className="w-full p-3 rounded-md bg-gray-100 text-gray-900 outline-none mb-6"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-md bg-lime-600 text-white hover:bg-lime-700">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
