import React from "react";
import { useNavigate } from "react-router-dom";

export function VolverButton() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 text-xl font-bold flex justify-end mt-auto">
      <button
        className="bg-[#1572E8] px-3 py-2 rounded-lg text-white"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>
  );
}
