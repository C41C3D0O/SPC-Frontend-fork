import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  updateUsuarios,
  getUsuarios,
} from "../api/registroUsuarios.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";


export function UpdatePassword() {

 
    function rolnavigation(){
      const userRol = Cookies.get("userRol");
    if (userRol === "Coordinador") {
      navigate("/dashboard-coordinador");
    } else if (userRol === "Vicerrector") {
      navigate("/dashboard-vicerrector");
    } else {
      navigate("/login");
    }
    }
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  // Obtener las contraseñas
  const nuevaPassword = watch("password");
  const confirmarPassword = watch("confirmarPassword");

  const onSubmit = handleSubmit(async (data) => {
    // Validación de que las contraseñas coincidan
    if (nuevaPassword !== confirmarPassword) {
      toast.error("Las contraseñas no coinciden", {
        position: "top-right",
        style: { background: "#101010", color: "#fff" },
      });
      return;
    }

    if (params.id) {
      await updateUsuarios(params.id, data);
      toast.success("Usuario actualizado", {
        position: "top-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    
  });

  useEffect(() => {
    async function loadUsuarios() {
      if (params.id) {
        const {
          data: { nombre, correo, rol, programa, is_active },
        } = await getUsuarios(params.id);
        setValue("nombre", nombre);
        setValue("correo", correo);
        setValue("rol", rol);
        setValue("programa", programa);
        setValue("is_active", is_active);
      }
    }
    loadUsuarios();
  }, []);
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex w-full">
        <div className="bg-[#1572E8] text-white py-4 px-4 text-xl font-bold w-1/5 flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold mb-4">
              {user && user.nombre ? user.nombre : "Desconocido"}
            </h1>
            <p className="text-base">{user ? user.rol : "Desconocido"}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-8 px-8 text-xl font-bold w-4/5 flex justify-start items-center">
          <h1 className="text-xl font-semibold">ACTUALIZACIÓN DE CONTRASEÑA</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-[#d7e9ff] w-full max-w-4xl mx-auto px-10 py-16 mt-16 mb-16 rounded-lg shadow-md">
          <form onSubmit={onSubmit}>
            {/* Nueva Contraseña */}
            <input
              type="password"
              placeholder="Nueva Contraseña"
              {...register("password", {
                required: "La nueva contraseña es requerida",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              className="bg-white p-3 rounded-lg block w-full mb-3"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            {/* Confirmar Contraseña */}
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              {...register("confirmarPassword", {
                required: "Debes confirmar la nueva contraseña",
                validate: (value) => value === nuevaPassword || "Las contraseñas no coinciden",
              })}
              className="bg-white p-3 rounded-lg block w-full mb-3"
            />
            {errors.confirmarPassword && (
              <span className="text-red-500">{errors.confirmarPassword.message}</span>
            )}

            <div className="flex justify-end m-2">
                
              <button onClick={rolnavigation} className="bg-[#1572E8] px-4 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 flex justify-end">
        <button
          onClick={rolnavigation}
          className="bg-[#1572E8] px-4 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
          Volver
        </button>
      </footer>
    </div>
  );
}
