import { useEffect, useState } from "react";
import { getAllCursos } from "../api/listarcursos";

export function ListarCursos() {
  const [verCursos, setCursos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 25; // Registros por página

  useEffect(() => {
    async function loadCursos() {
      const res = await getAllCursos();
      setCursos(res.data);
    }
    loadCursos();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(verCursos.length / itemsPerPage);
  const paginatedData = verCursos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#d7e9ff] to-[#f5faff]">
      {/* Content */}
      <div className="flex-grow p-8 space-y-8">
        {verCursos.length === 0 && <p className="text-center">No hay cursos disponibles.</p>}
        {verCursos.length > 0 && (
          <>
            <div className="overflow-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-[#00498B] text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Código Curso</th>
                    <th className="px-4 py-2 text-left">Semestre</th>
                    <th className="px-4 py-2 text-left">Nombre Curso</th>
                    <th className="px-4 py-2 text-left">Jornada</th>
                    <th className="px-4 py-2 text-left">Grupo</th>
                    <th className="px-4 py-2 text-left">Programa</th>
                    <th className="px-4 py-2 text-left">Cupo Máximo</th>
                    <th className="px-4 py-2 text-left">No. Estudiantes</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((curso, index) => (
                    <tr key={curso.id_curso} className={index % 2 === 0 ? "bg-white" : "bg-[#e3f2ff]"}>
                      <td className="px-4 py-2">{curso.cod_curso}</td>
                      <td className="px-4 py-2">{curso.semestre}</td>
                      <td className="px-4 py-2">{curso.nom_curso}</td>
                      <td className="px-4 py-2">{curso.jornada}</td>
                      <td className="px-4 py-2">{curso.grupo}</td>
                      <td className="px-4 py-2">{curso.programa}</td>
                      <td className="px-4 py-2">{curso.cupo_max}</td>
                      <td className="px-4 py-2">{curso.no_estudiantes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#00498B] text-white hover:bg-[#003566]"
                }`}
              >
                Anterior
              </button>
              <span className="text-[#00498B] font-semibold">
                Página {currentPage} de {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#00498B] text-white hover:bg-[#003566]"
                }`}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
