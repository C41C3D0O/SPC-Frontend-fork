import { useNavigate } from "react-router-dom";

export function UsuariosCard({ registroUsuarios }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#d7e9ff] p-3 hover:bg-[#9ec7fa] hover:cursor-pointer"
      onClick={() => {
        navigate(`/lista-usuarios/${registroUsuarios.id}`);
      }}
    >
      <h1 className="font-bold uppercase">{registroUsuarios.nombre}</h1>
      <p className="text-black">{registroUsuarios.correo}</p>
      <p className="text-black mt-1">Rol: {registroUsuarios.rol}</p>
      {registroUsuarios.rol === "Coordinador" && (
        <p className="text-black mt-1">
          Programa: {registroUsuarios.programa}
        </p>
      )}
      <p className="text-black mt-1">
        Estado: {registroUsuarios.is_active ? "Activo" : "Inactivo"}
      </p>
    </div>
  );
}
