import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { VolverButton } from "./VolverButton";
import { Toaster } from "react-hot-toast";

export function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Contenedor principal para rutas protegidas */}
      <div className="flex-grow">
        <Navigation />
        <div className="p-4 bg-white">
          <Outlet />
        </div>
      </div>

      <Toaster />
    </div>
  );
}
