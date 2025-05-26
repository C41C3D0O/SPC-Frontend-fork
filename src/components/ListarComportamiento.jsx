import { useEffect, useState } from "react";
import { getAllComportamiento } from "../api/listarComportamiento";

export function ListarComportamiento() {
  const [verComportamiento, setComportamiento] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 25; // Registros por página

  useEffect(() => {
    async function loadComportamiento() {
      const res = await getAllComportamiento();
      setComportamiento(res.data);
    }
    loadComportamiento();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(verComportamiento.length / itemsPerPage);
  const paginatedData = verComportamiento.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#d7e9ff] to-[#f5faff]">
      {/* Content */}
      <div className="flex-grow p-8 space-y-8">
        {verComportamiento.length === 0 && <p className="text-center">No hay comportamientos disponibles.</p>}
        {verComportamiento.length > 0 && (
          <>
            <div className="overflow-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-[#00498B] text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Programa</th>
                    <th className="px-4 py-2 text-left">Código Curso</th>
                    <th className="px-4 py-2 text-left">Código Semestre</th>
                    <th className="px-4 py-2 text-left">Semestre</th>
                    <th className="px-4 py-2 text-left">Nombre Curso</th>
                    <th className="px-4 py-2 text-left">Código Jornada</th>
                    <th className="px-4 py-2 text-left">Jornada</th>
                    <th className="px-4 py-2 text-left">Grupo</th>
                    <th className="px-4 py-2 text-left">No. Estudiantes</th>
                    <th className="px-4 py-2 text-left">Promedio Nota</th>
                    <th className="px-4 py-2 text-left">Habilitan</th>
                    <th className="px-4 py-2 text-left">Pierden Habilitación</th>
                    <th className="px-4 py-2 text-left">Pierden Total</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((comportamiento, index) => (
                    <tr
                      key={comportamiento.id_comportamiento}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#e3f2ff]"}
                    >
                      <td className="px-4 py-2">{comportamiento.programa}</td>
                      <td className="px-4 py-2">{comportamiento.cod_curso}</td>
                      <td className="px-4 py-2">{comportamiento.cod_semestre}</td>
                      <td className="px-4 py-2">{comportamiento.semestre}</td>
                      <td className="px-4 py-2">{comportamiento.nom_curso}</td>
                      <td className="px-4 py-2">{comportamiento.cod_jornada}</td>
                      <td className="px-4 py-2">{comportamiento.jornada}</td>
                      <td className="px-4 py-2">{comportamiento.grupo}</td>
                      <td className="px-4 py-2">{comportamiento.no_estudiantes}</td>
                      <td className="px-4 py-2">{comportamiento.prom_nota}</td>
                      <td className="px-4 py-2">{comportamiento.habilitan}</td>
                      <td className="px-4 py-2">{comportamiento.pierdenh}</td>
                      <td className="px-4 py-2">{comportamiento.pierden_total}</td>
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

