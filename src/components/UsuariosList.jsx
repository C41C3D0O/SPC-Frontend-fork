import { useEffect, useState } from "react";
import { getAllUsuarios } from "../api/registroUsuarios.api";
import { UsuariosCard } from "./UsuariosCard";
import { Link } from "react-router-dom";

export function UsuariosList() {
  const [registroUsuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function loadUsuarios() {
      const res = await getAllUsuarios();
      setUsuarios(res.data);
    }
    loadUsuarios();
  }, []);

  return (
    <div className="p-6">
      {registroUsuarios.map((registroUsuarios) => (
        <UsuariosCard
          key={registroUsuarios.id}
          registroUsuarios={registroUsuarios}
        />
      ))}

      {/* Botón volver al dashboard */}
      <div className="flex justify-center mt-10">
        <Link to="/gestion-usuarios">
          <button className="bg-[#1572E8] px-3 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
}
