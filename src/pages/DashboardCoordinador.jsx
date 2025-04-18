// src/pages/DashboardCoordinador.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
// Íconos (puedes cambiarlos o quitar alguno si no los usas aquí)
import uploadIcon from "../assets/upload-svgrepo-com.png";
import viewIcon from "../assets/view-svgrepo-com.png";
import userCogIcon from "../assets/user-cog-svgrepo-com.png";

export function DashboardCoordinador() {
  const navigate = useNavigate();
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("Sesión finalizada", { position: "top-center" });
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex w-full">
        {/* Sección de usuario */}
        <div className="bg-[#1572E8] text-white py-4 px-4 text-xl font-bold w-1/5 flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold mb-4">
              {user && user.nombre ? user.nombre : "Desconocido"}
            </h1>
            <p className="text-lg">{user ? user.rol : "Desconocido"}</p>
          </div>
        </div>
        {/* Sección de título con header */}
        <div className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-8 px-8 text-xl font-bold w-4/5 flex justify-start items-center">
          <h1 className="text-xl font-semibold">DASHBOARD DEL COORDINADOR</h1>
        </div>
      </div>
      <div className="bg-[#d7e9ff] mx-20 p-20 rounded-lg mt-14">
        <div className="flex flex-wrap justify-center items-center gap-20">

          {/* Visualizar proyecciones */}
          <div className="flex flex-col items-center space-y-4">
            <img src={viewIcon} alt="Visualizar proyecciones" className="w-20 h-20" />
            <button className="bg-[#1572E8] px-6 py-3 rounded-lg text-white font-bold hover:bg-[#0f5fc7] transition-all duration-300">
              Visualizar proyecciones
            </button>
          </div>

          {/* Aqui se debe poner la logica de Delgado para actualizar contrasenas y cambiar icono */}
          <div className="flex flex-col items-center space-y-4">
            <img src={userCogIcon} alt="Gestión de usuario" className="w-20 h-20" />
            <Link to="/gestion-usuarios">
              <button className="bg-[#1572E8] px-6 py-3 rounded-lg text-white font-bold hover:bg-[#0f5fc7] transition-all duration-300">
                Actualizar contraseña
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-6 mt-auto">
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
          >
            Cerrar sesión
          </button>
        </div>
      </footer>
    </div>
  );
}
