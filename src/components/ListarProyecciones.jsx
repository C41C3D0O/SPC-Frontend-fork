import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getAllProllecciones } from "../api/listarProyeccion";

export function ListarProyecciones({ searchQuery = "", appliedFilters = {} }) {
  const [verProyeccion, setProyeccion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProyeccion() {
      const res = await getAllProllecciones();
      setProyeccion(res.data);
    }
    loadProyeccion();
  }, []);

  const normalizeText = (text) => {
    if (!text) return '';
    return text
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Elimina acentos
      .toUpperCase()
      .trim();
  };

  const applyFilters = (rows) => {
    let filteredRows = [...rows];
    
    // Aplicar filtro de búsqueda
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredRows = filteredRows.filter((row) =>
        ["id_proyeccion", "anio", "periodo", "programa", "curso", "semestre", "version"].some(
          (field) => row[field]?.toString().toLowerCase().includes(q)
        )
      );
    }
    
    // Aplicar filtros del formulario
    if (appliedFilters) {
      // Mapeo de semestres a formato de la base de datos
      const semestreMap = {
        "Primero": "PRIMER SEMESTRE",
        "Segundo": "SEGUNDO SEMESTRE",
        "Tercero": "TERCER SEMESTRE",
        "Cuarto": "CUARTO SEMESTRE",
        "Quinto": "QUINTO SEMESTRE",
        "Sexto": "SEXTO SEMESTRE",
        "Séptimo": "SEPTIMO SEMESTRE",
        "Octavo": "OCTAVO SEMESTRE",
        "Noveno": "NOVENO SEMESTRE"
      };
      
      // Filtro por programa (comparación exacta normalizada)
      if (appliedFilters.programa && appliedFilters.programa !== "") {
        const programaFilter = normalizeText(appliedFilters.programa);
        filteredRows = filteredRows.filter(row => 
          row.programa && normalizeText(row.programa) === programaFilter
        );
      }
      
      // Filtro por año (exacto)
      if (appliedFilters.año && appliedFilters.año !== "") {
        filteredRows = filteredRows.filter(row => 
          row.anio && row.anio.toString() === appliedFilters.año
        );
      }
      
      // Filtro por periodo (exacto)
      if (appliedFilters.periodo && appliedFilters.periodo !== "") {
        filteredRows = filteredRows.filter(row => 
          row.periodo && row.periodo.toString() === appliedFilters.periodo
        );
      }
      
      // Filtro por semestre
      if (appliedFilters.semestre && appliedFilters.semestre !== "") {
        const semestreBuscado = semestreMap[appliedFilters.semestre] || appliedFilters.semestre.toUpperCase();
        filteredRows = filteredRows.filter(row => 
          row.semestre && normalizeText(row.semestre) === semestreBuscado
        );
      }
      
      // Filtro por versión (case insensitive)
      if (appliedFilters.version && appliedFilters.version !== "") {
        filteredRows = filteredRows.filter(row => 
          row.version && normalizeText(row.version) === normalizeText(appliedFilters.version)
        );
      }
      
      // Filtro por curso (comparación exacta normalizada)
      if (appliedFilters.curso && appliedFilters.curso !== "") {
        const cursoFilter = normalizeText(appliedFilters.curso);
        filteredRows = filteredRows.filter(row => 
          row.curso && normalizeText(row.curso) === cursoFilter
        );
      }
    }
    
    return filteredRows;
  };

  function rolnavigation() {
    const userRol = Cookies.get("userRol");
    if (userRol === "Coordinador") {
      navigate("/dashboard-coordinador");
    } else if (userRol === "Vicerrector") {
      navigate("/dashboard-vicerrector");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#d7e9ff] to-[#f5faff]">
      {/* Content */}
      <div className="flex-grow p-8 space-y-8">
        {verProyeccion.length === 0 && <p className="text-center">No hay proyecciones disponibles.</p>}
        <div className="overflow-auto border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-[#00498B] text-white">
              <tr>
                
                <th className="px-4 py-2 text-left">Año</th>
                <th className="px-4 py-2 text-left">Periodo</th>
                <th className="px-4 py-2 text-left">Versión</th>
                <th className="px-4 py-2 text-left">Programa</th>
                <th className="px-4 py-2 text-left">Semestre</th>
                <th className="px-4 py-2 text-left">Curso</th>
                <th className="px-4 py-2 text-left">Grupo</th>
                <th className="px-4 py-2 text-left">Cupo Máximo</th>
                <th className="px-4 py-2 text-left">Estudiantes Final</th>
              </tr>
            </thead>
            <tbody>
              {applyFilters(verProyeccion).map((proyeccion, index) => (
                <tr key={proyeccion.id_proyeccion} className={index % 2 === 0 ? "bg-white" : "bg-[#e3f2ff]"}>
                  
                  <td className="px-4 py-2">{proyeccion.anio}</td>
                  <td className="px-4 py-2">{proyeccion.periodo}</td>
                  <td className="px-4 py-2">{proyeccion.version}</td>
                  <td className="px-4 py-2">{proyeccion.programa}</td>
                  <td className="px-4 py-2">{proyeccion.semestre}</td>
                  <td className="px-4 py-2">{proyeccion.curso}</td>
                  <td className="px-4 py-2">{proyeccion.grupo}</td>
                  <td className="px-4 py-2">{proyeccion.cupo_max}</td>
                  <td className="px-4 py-2">{proyeccion.no_estud_final}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}