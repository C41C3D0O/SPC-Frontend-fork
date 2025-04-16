import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  "Coordinador Facultad Ciencias Sociales y Humanidades",
  "Coordinador Programa Licenciatura en Eduación Infantil",
  "Coordinador Facultad de Ciencias Administrativas Contables y Económicas",
  "Coordinador Programas Contaduría Pública",
  "Coordinador Finanzas y Negocios Internacionales",
  "Coordinador Facultad Ciencias Ambientales y Desarrollo Sostenible",
  "Coordinadora Programa Ingeniería Electrónica",
  "Coordinador Programa Ingeniería de Software y Computación",
  "Coordinación Entrenamiento Deportivo",
  "Coordinación Gobierno y Relaciones Internacionales",
  "Coordinador del programa de Ing. Ambiental y Saneamiento",
  "Coordinadora del programa de Ingeniería Civil",
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
  // Observar el valor del campo "rol"
  const rol = watch("rol", "Coordinador");

  const onSubmit = handleSubmit(async (data) => {
    // Si el rol es Vicerrector, forzamos el campo programa a cadena vacía.
    if (data.rol === "Vicerrector") {
      data.programa = "";
    }

    // Si estamos actualizando y el password es vacío (o solo espacios), lo eliminamos.
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

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nombres y apellidos"
          {...register("nombre", { required: true })}
          className="bg-[#d7e9ff] p-3 rounded-lg block w-full mb-3"
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
          className="bg-[#d7e9ff] p-3 rounded-lg block w-full mb-3"
        />
        {errors.correo && <span>{errors.correo.message}</span>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: !params.id ? "El password es requerido" : false,
          })}
          className="bg-[#d7e9ff] p-3 rounded-lg block w-full mb-3"
        />
        {errors.password && <span>{errors.password.message}</span>}

        {/* Rol */}
        <select
          {...register("rol", { required: "El rol es requerido" })}
          className="bg-[#d7e9ff] p-3 rounded-lg block w-full mb-3"
        >
          <option value="Coordinador">Coordinador</option>
          <option value="Vicerrector">Vicerrector</option>
        </select>
        {errors.rol && <span>{errors.rol.message}</span>}

        {/* Programa: solo si rol es Coordinador */}
        {rol === "Coordinador" && (
          <select
            {...register("programa", {
              required: "El programa es requerido para Coordinador",
            })}
            className="bg-[#d7e9ff] p-3 rounded-lg block w-full mb-3"
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

        {/* Input para is_active */}
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

        <button className="bg-[#1572E8] text-white p-3 rounded-lg block w-full mt-3">
          Guardar
        </button>
        
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg block w-full mt-3"
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
