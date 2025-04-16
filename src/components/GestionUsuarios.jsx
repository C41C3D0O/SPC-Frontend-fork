// src/components/GestionUsuarios.jsx
import { Link } from "react-router-dom";
import IconModUser from "../assets/Iconos/gui-user-edit-svgrepo-com.svg";
import IconRegUser from "../assets/Iconos/new-user-svgrepo-com.svg";
// Importa los íconos
import uploadIcon from "../assets/upload-svgrepo-com.png";
import viewIcon from "../assets/view-svgrepo-com.png";
import userCogIcon from "../assets/user-cog-svgrepo-com.png";

export function GestionUsuarios() {
  return (
    
    <div>
      <div className="bg-[#d7e9ff] mx-20 p-20 rounded-lg flex items-center justify-center space-x-20 mt-14">
        <div className="flex flex-col items-center">
          <img
            src={IconRegUser}
            alt="Registrar Usuario"
            className="w-10 h-10 mb-2"
          />
          <button className="bg-[#1572E8] px-3 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
            <Link to="/formulario-registro-usuarios">Registrar usuario</Link>
          </button>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={IconModUser}
            alt="Modificar Usuario"
            className="w-10 h-10 mb-2"
          />
          <button className="bg-[#1572E8] px-3 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
            <Link to="/lista-usuarios">Modificar usuario</Link>
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/dashboard">
          <button className="bg-[#1572E8] px-3 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
            Inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
