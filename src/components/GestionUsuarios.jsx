// src/components/GestionUsuarios.jsx
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// Importa los íconos
import IconModUser from "../assets/Iconos/gui-user-edit-svgrepo-com.png";
import IconRegUser from "../assets/Iconos/new-user-svgrepo-com.png";

export function GestionUsuarios() {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex w-full">
        {/* Usuario */}
        <div className="bg-[#1572E8] text-white py-4 px-4 text-xl font-bold w-1/5 flex items-center space-x-4">
        <div>
            <h1 className="text-xl font-bold mb-4">
              {user && user.nombre ? user.nombre : "Desconocido"}
            </h1>
            <p className="text-base">{user ? user.rol : "Desconocido"}</p>
          </div>
        </div>

        {/* Título */}
        <div className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-8 px-8 text-xl font-bold w-4/5 flex justify-start items-center">
          <h1 className="text-xl font-semibold">GESTIÓN DE USUARIOS</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-[#d7e9ff] w-full max-w-4xl mx-auto px-10 py-16 mt-16 mb-16 rounded-lg flex items-center justify-center space-x-20 shadow-md">
          {/* Registrar usuario */}
          <div className="flex flex-col items-center">
            <img
              src={IconRegUser}
              alt="Registrar Usuario"
              className="w-20 h-20 mb-2"
            />
            <button className="bg-[#1572E8] px-3 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
              <Link to="/formulario-registro-usuarios">Registrar usuario</Link>
            </button>
          </div>

          {/* parte de modificar usuario */}
          <div className="flex flex-col items-center">
            <img
              src={IconModUser}
              alt="Modificar Usuario"
              className="w-20 h-20 mb-2"
            />
            <button className="bg-[#1572E8] px-3 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
              <Link to="/lista-usuarios">Modificar usuario</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 text-xl font-bold flex justify-center">
        <Link to="/dashboard">
          <button className="bg-[#1572E8] px-4 py-2 rounded-lg text-white">
            Inicio
          </button>
        </Link>
      </footer>
    </div>
  );
}
