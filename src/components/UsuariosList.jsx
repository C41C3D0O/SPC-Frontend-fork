import { useEffect, useState } from "react";
import { getAllUsuarios } from "../api/registroUsuarios.api";
import { UsuariosCard } from "./UsuariosCard";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";


export function UsuariosList() {
  const [registroUsuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function loadUsuarios() {
      const res = await getAllUsuarios();
      setUsuarios(res.data);
    }
    loadUsuarios();
  }, []);
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;


  return (
    <div className="p-6">

  {/* header */}
  <div className="flex flex-wrap w-full mb-6">
  <div className="bg-[#1572E8] text-white py-4 px-4 text-xl font-bold w-1/5 flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold mb-4">
              {user && user.nombre ? user.nombre : "Desconocido"}
            </h1>
            <p className="text-base">{user ? user.rol : "Desconocido"}</p>
          </div>
        </div>

    <div className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-8 px-8 text-xl font-bold w-full sm:w-4/5 flex justify-start items-center">
      <h1 className="text-xl font-semibold">REGISTRO / LISTA DE USUARIOS</h1>
    </div>
  </div>

  {/* Mapeo de registros de usuarios */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"> {/* Agregado el margen inferior mb-8 */}
    {registroUsuarios.map((registroUsuarios) => (
      <UsuariosCard
        key={registroUsuarios.id}
        registroUsuarios={registroUsuarios}
      />
    ))}
  </div>

  {/* Footer */}
  <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 text-xl font-bold flex justify-end mt-6"> {/* Agregado margen superior mt-6 */}
    <Link to="/gestion-usuarios">
      <button className="bg-[#1572E8] px-6 py-3 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300 text-lg font-semibold">
        Volver
      </button>
    </Link>
  </footer>

</div>

  );
}
