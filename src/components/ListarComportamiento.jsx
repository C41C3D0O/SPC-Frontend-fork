import { useEffect, useState } from "react";
import { getAllComportamiento } from "../api/listarComportamiento";

export function ListarComportamiento() {
    const [verComportamiento, setComportamiento] = useState([]);

    useEffect(() => {
        async function loadComportamiento() {
            const res = await getAllComportamiento();
            setComportamiento(res.data);
        }
        loadComportamiento();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#d7e9ff] to-[#f5faff]">
            {/* Content */}
            <div className="flex-grow p-8 space-y-8">
                {verComportamiento.length === 0 && <p className="text-center">No hay comportamientos disponibles.</p>}
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
                            {verComportamiento.map((comportamiento, index) => (
                                <tr key={comportamiento.id_comportamiento} className={index % 2 === 0 ? "bg-white" : "bg-[#e3f2ff]"}>
                                    
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
            </div>
        </div>
    );
}
