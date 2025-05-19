import { useEffect, useState } from "react";
import { getAllCursos } from "../api/listarcursos";

export function ListarCursos() {
    const [verCursos, setCursos] = useState([]);

    useEffect(() => {
        async function loadCursos() {
            const res = await getAllCursos();
            setCursos(res.data);
        }
        loadCursos();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#d7e9ff] to-[#f5faff]">
            {/* Content */}
            <div className="flex-grow p-8 space-y-8">
                {verCursos.length === 0 && <p className="text-center">No hay cursos disponibles.</p>}
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
                            {verCursos.map((curso, index) => (
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
            </div>
        </div>
    );
}
