import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUsuarios } from "../api/registroUsuarios.api"; 
import { toast } from "react-hot-toast";

export function ValidacionDatos({ onDatosRecibidos }) {
  const [programaId, setProgramaId] = useState(null);
  const [loading, setLoading] = useState(true);

  const programasMap = {
    "Coordinador Programas Contaduría Pública": 1,
    "Coordinador Finanzas y Negocios Internacionales": 2,
    "Coordinador Facultad Ciencias Ambientales y Desarrollo Sostenible": 3,
    "Coordinadora Programa Ingeniería Electrónica": 4,
    "Coordinador Programa Ingeniería de Software y Computación": 5,
    "Coordinación Entrenamiento Deportivo": 6,
    "Coordinación Gobierno y Relaciones Internacionales": 7,
    "Coordinador del programa de Ing. Ambiental y Saneamiento": 8,
    "Coordinadora del programa de Ingeniería Civil": 9
  };

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) {
          throw new Error("Usuario no autenticado. ID no encontrado.");
        }

        const res = await getUsuarios(userId);
        const { rol, programa } = res.data;

        const id = programasMap[programa] || null;
        setProgramaId(id);
        if (onDatosRecibidos) onDatosRecibidos(id);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        toast.error("No se pudo obtener la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [onDatosRecibidos]);

  if (loading) return null;

  return null;
}
