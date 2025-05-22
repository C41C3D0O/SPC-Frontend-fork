import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function FilterPopup({ isOpen, onClose }) {
  const [selectedPrograma, setSelectedPrograma] = useState("Todos");
  const [selectedAño, setSelectedAño] = useState(null);
  const [selectedPeriodo, setSelectedPeriodo] = useState("Todos");
  const [selectedVersion, setSelectedVersion] = useState("Todos");

  const PROGRAMAS_PERMITIDOS = [
    "Todos",
    "EDUCACION INFANTIL",
    "CONTADURIA PUBLICA",
    "FINANZAS Y NEGOCIOS INTERNACIONALES",
    "INGENIERIA ELECTRONICA",
    "INGENIERIA DE SOFTWARE Y COMPUTACION",
    "ENTRENAMIENTO DEPORTIVO",
    "GOBIERNO Y RELACIONES INTERNACIONALES",
    "INGENIERIA AMBIENTAL Y SANEAMIENTO",
    "INGENIERIA CIVIL",
  ];

  const PERIODOS_PERMITIDOS = ["Todos", "1", "2"];
  const VERSION_PERMITIDOS = ["Todos", "Preliminar", "Final"];

  const downloadCSV = async (filters) => {
    // Construir los parámetros de la URL
    const params = new URLSearchParams();
    
    if (filters.programa) params.append('programa', filters.programa);
    if (filters.año) params.append('anio', filters.año);
    if (filters.periodo) params.append('periodo', filters.periodo);
    if (filters.version) params.append('version', filters.version);

    try {
      const response = await fetch(`http://localhost:8000/proyeccion/exportar-proyecciones?${params.toString()}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al descargar el archivo');
      }
      
      // Crear un blob con la respuesta y descargarlo
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'proyecciones.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error al descargar:', error);
      alert(error.message);
    }
  };

  const handleDownload = () => {
    const filters = {
      programa: selectedPrograma === "Todos" ? null : selectedPrograma,
      año: selectedAño ? selectedAño.getFullYear().toString() : null,
      periodo: selectedPeriodo === "Todos" ? null : selectedPeriodo,
      version: selectedVersion === "Todos" ? null : selectedVersion,
    };
    
    downloadCSV(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Filtrar para Descargar</h2>
        
        {/* Programa */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Programa</label>
          <select
            className="bg-gray-100 p-3 rounded-lg block w-full"
            value={selectedPrograma}
            onChange={(e) => setSelectedPrograma(e.target.value)}
          >
            {PROGRAMAS_PERMITIDOS.map((programa) => (
              <option key={programa} value={programa}>
                {programa}
              </option>
            ))}
          </select>
        </div>

        {/* Año */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Año</label>
          <DatePicker
            selected={selectedAño}
            onChange={(date) => setSelectedAño(date)}
            showYearPicker
            dateFormat="yyyy"
            className="bg-gray-100 p-3 rounded-lg block w-full"
            placeholderText="Seleccione un año"
          />
        </div>

        {/* Periodo */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Periodo</label>
          <select
            className="bg-gray-100 p-3 rounded-lg block w-full"
            value={selectedPeriodo}
            onChange={(e) => setSelectedPeriodo(e.target.value)}
          >
            {PERIODOS_PERMITIDOS.map((periodo) => (
              <option key={periodo} value={periodo}>
                {periodo}
              </option>
            ))}
          </select>
        </div>

        {/* Versión */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Versión</label>
          <select
            className="bg-gray-100 p-3 rounded-lg block w-full"
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
          >
            {VERSION_PERMITIDOS.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
}