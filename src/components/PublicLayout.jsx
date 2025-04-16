import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Aquí se mostrará el contenido público (por ejemplo, el Login) */}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}
