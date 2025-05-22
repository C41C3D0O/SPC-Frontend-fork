import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import {
  createUsuarios,
  deleteUsuarios,
  updateUsuarios,
  getUsuarios,
} from "../api/registroUsuarios.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const PROGRAMAS_PERMITIDOS = [
    "EDUCACIÓN INFANTIL",
    "CONTADURÍA PÚBLICA",
    "FINANZAS Y NEGOCIOS INTERNACIONALES",
    "INGENIERÍA ELECTRÓNICA",
    "INGENIERÍA DE SOFTWARE Y COMPUTACIÓN",
    "ENTRENAMIENTO DEPORTIVO",
    "GOBIERNO Y RELACIONES INTERNACIONALES",
    "INGENIERÍA AMBIENTAL Y SANEAMIENTO",
    "INGENIERÍA CIVIL"
];

export function FormularioRegistroUsuarios() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const rol = watch("rol", "");

  const onSubmit = handleSubmit(async (data) => {
    if (data.rol !== "Coordinador") {
      data.programa = "";
    }

    if (params.id && (!data.password || data.password.trim() === "")) {
      delete data.password;
    }

    console.log("Payload final:", data);

    if (params.id) {
      await updateUsuarios(params.id, data);
      toast.success("Usuario actualizado", {
        position: "top-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createUsuarios(data);
      toast.success("Usuario creado", {
        position: "top-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/lista-usuarios");
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
          <h1 className="text-xl font-semibold">REGISTRO DE USUARIOS</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-[#d7e9ff] w-full max-w-4xl mx-auto px-10 py-16 mt-16 mb-16 rounded-lg shadow-md">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Nombres y apellidos"
              {...register("nombre", { required: true })}
              className="bg-white p-3 rounded-lg block w-full mb-3"
            />
            {errors.nombre && <span>El nombre es requerido</span>}

            <input
              type="email"
              placeholder="Correo"
              {...register("correo", {
                required: "El correo es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresa un correo válido",
                },
              })}
              className="bg-white p-3 rounded-lg block w-full mb-3"
            />
            {errors.correo && <span>{errors.correo.message}</span>}

            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: !params.id ? "El password es requerido" : false,
              })}
              className="bg-white p-3 rounded-lg block w-full mb-3"
            />
            {errors.password && <span>{errors.password.message}</span>}

            <select
              {...register("rol", { required: "El rol es requerido" })}
              className="bg-white p-3 rounded-lg block w-full mb-3"
            >
              <option value="" disabled>Seleccione un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Coordinador">Coordinador</option>
              <option value="Vicerrector">Vicerrector</option>
            </select>
            {errors.rol && <span>{errors.rol.message}</span>}

            {rol === "Coordinador" && (
              <select
                {...register("programa", {
                  required: "El programa es requerido para Coordinador",
                })}
                className="bg-white p-3 rounded-lg block w-full mb-3"
              >
                <option value="">Seleccione un programa</option>
                {PROGRAMAS_PERMITIDOS.map((prog, index) => (
                  <option key={index} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            )}
            {rol === "Coordinador" && errors.programa && (
              <span>{errors.programa.message}</span>
            )}

            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="is_active"
                {...register("is_active")}
                className="mr-2"
              />
              <label htmlFor="is_active" className="text-black">
                Activo
              </label>
            </div>

           <div className="flex justify-end m-2">

           <button className="bg-[#1572E8] text-white px-4 py-2 rounded-lg w-full hover:bg-[#0f5fc7] transition-all duration-300 ">
              Guardar
            </button>

           </div>
          </form>

          {params.id && (
            <div className="flex justify-end m-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-800[ transition-all duration-300 "
                onClick={async () => {
                  const accepted = window.confirm("¿Estas seguro?");
                  if (accepted) {
                    await deleteUsuarios(params.id);
                    toast.success("Usuario eliminado", {
                      position: "top-right",
                      style: {
                        background: "#101010",
                        color: "#fff",
                      },
                    });
                    navigate("/lista-usuarios");
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          )}

          
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 text-xl font-bold flex justify-end">
      <Link to="/gestion-usuarios">
              <button className="bg-[#1572E8] px-3 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
                Volver
              </button>
            </Link>
      </footer>
    </div>
  );
}

