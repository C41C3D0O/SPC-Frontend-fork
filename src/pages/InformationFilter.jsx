import React, { useState } from "react";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export function InformationFilter() {
  const navigate = useNavigate();
  const [selectedTipo, setSelectedTipo] = useState("proyecciones");
  const [selectedPrograma, setSelectedPrograma] = useState("Todos");
  const [selectedAño, setSelectedAño] = useState(null);
  const [selectedPeriodo, setSelectedPeriodo] = useState("Todos");
  const [selectedSemestre, setSelectedSemestre] = useState("Todos");
  const [selectedVersion, setSelectedVersion] = useState("Todos");
  const [selectedCurso, setSelectedCurso] = useState("Todos");

  const TIPOS_VISUALIZACION = [
    { value: "proyecciones", label: "Proyecciones" },
    { value: "cursos", label: "Cursos" },
    { value: "comportamiento", label: "Comportamiento" }
  ];

  const PROGRAMAS_PERMITIDOS = [
    "Todos",
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

  const PERIODOS_PERMITIDOS = ["Todos", "1", "2"];

  const SEMESTRE_PERMITIDOS = [
    "Todos",
    "Primero",
    "Segundo",
    "Tercero",
    "Cuarto",
    "Quinto",
    "Sexto",
    "Séptimo",
    "Octavo",
    "Noveno"
  ];

  const VERSION_PERMITIDOS = ["Todos", "Preliminar", "Final"];

  const CURSOS_PERMITIDOS = [
    "Todos",
    "ALGEBRA MODERNA",
    "INTRODUCCION A LA INGENIERÍA",
    "INTRODUCCIÓN A LA PROGRAMACIÓN",
    "CALCULO I",
    "ALGEBRA LINEAL",
    "FISICA I",
    "PROGRAMACION I",
    "CALCULO II",
    "MATEMATICAS DISCRETAS",
    "FISICA II",
    "ARQUITECTURA DE COMPUTADORES",
    "PROGRAMACION II",
    "ECUACIONES DIFERENCIALES",
    "BASE DE DATOS I",
    "ESTRUCTURA DE DATOS",
    "INGENIERIA DEL SOFTWARE I",
    "PROBABILIDAD COMPUTACIONAL Y ESTADISTICA",
    "BASE DE DATOS II",
    "COMPLEJIDAD ALGORITMICA",
    "DESARROLLO APLICACIONES WEB",
    "INGENIERIA DEL SOFTWARE II",
    "ANALISIS NUMÉRICO",
    "ARQUITECTURA DE SISTEMAS OPERATIVOS",
    "BASE DE DATOS AVANZADAS",
    "TEORIA DE LA COMPUTACION",
    "DESARROLLO DE APLICACIONES MÓVILES",
    "CALIDAD DEL SOFTWARE I",
    "MODELADO PARA LA COMPUTACIÓN",
    "REDES DE COMPUTADORES",
    "SEGURIDAD INFORMATICA",
    "ARQUITECTURA DE SOFTWARE",
    "CALIDAD DE SOFTWARE II",
    "GESTIÓN DE REDES",
    "SISTEMA DE INFORMACIÓN EMPRESARIAL",
    "ELECTIVA I (Optativa)",
    "ELECTIVA III (Especializada)",
    "ELECTIVA V (Especizalizada)",
    "HCI",
    "PRACTICA PROFESIONAL",
    "GESTIÓN TECNOLÓGICA Y FINANCIERA",
    "ELECTIVA II (Optativa)",
    "ELECTIVA IV (Especializada)",
    "ELECTIVA VI (Especializada)",
    "96 HORAS SEMINARIOS DE ACTUALIZACION",
    "CERT ACTIVIDAD DEP FORMATIVO"
  ];

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  const handleVisualizarClick = () => {
    const filters = {
      tipo: selectedTipo,
      programa: selectedPrograma === "Todos" ? "" : selectedPrograma,
      año: selectedAño ? selectedAño.getFullYear().toString() : "",
      periodo: selectedPeriodo === "Todos" ? "" : selectedPeriodo,
      semestre: selectedSemestre === "Todos" ? "" : selectedSemestre,
      version: selectedVersion === "Todos" ? "" : selectedVersion,
      curso: selectedCurso === "Todos" ? "" : selectedCurso
    };
    
    navigate("/visualizar-proyecciones", { state: { filters } });
  };

  const isFiltrosDisabled = selectedTipo !== "proyecciones";
  const opacityClass = isFiltrosDisabled ? "opacity-50" : "opacity-100";

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
          <h1 className="text-xl font-semibold">VISUALIZAR INFORMACIÓN</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-[#d7e9ff] w-full max-w-4xl mx-auto px-10 py-16 mt-16 mb-16 rounded-lg shadow-md">
          {/* Tipo de Visualización */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Tipo de Visualización</label>
            <select
              className="bg-gray-100 p-3 rounded-lg block w-full"
              value={selectedTipo}
              onChange={(e) => setSelectedTipo(e.target.value)}
            >
              {TIPOS_VISUALIZACION.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtros (solo habilitados para proyecciones) */}
          <div className={opacityClass}>
            {/* Programa */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Programa</label>
              <select
                className="bg-gray-100 p-3 rounded-lg block w-full"
                value={selectedPrograma}
                onChange={(e) => setSelectedPrograma(e.target.value)}
                disabled={isFiltrosDisabled}
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
                disabled={isFiltrosDisabled}
              />
            </div>

            {/* Periodo */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Periodo</label>
              <select
                className="bg-gray-100 p-3 rounded-lg block w-full"
                value={selectedPeriodo}
                onChange={(e) => setSelectedPeriodo(e.target.value)}
                disabled={isFiltrosDisabled}
              >
                {PERIODOS_PERMITIDOS.map((periodo) => (
                  <option key={periodo} value={periodo}>
                    {periodo}
                  </option>
                ))}
              </select>
            </div>

            {/* Semestre */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Semestre</label>
              <select
                className="bg-gray-100 p-3 rounded-lg block w-full"
                value={selectedSemestre}
                onChange={(e) => setSelectedSemestre(e.target.value)}
                disabled={isFiltrosDisabled}
              >
                {SEMESTRE_PERMITIDOS.map((semestre) => (
                  <option key={semestre} value={semestre}>
                    {semestre}
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
                disabled={isFiltrosDisabled}
              >
                {VERSION_PERMITIDOS.map((version) => (
                  <option key={version} value={version}>
                    {version}
                  </option>
                ))}
              </select>
            </div>

            {/* Curso */}
            <div>
              <label className="block mb-2 font-semibold">Curso</label>
              <select
                className="bg-gray-100 p-3 rounded-lg block w-full"
                value={selectedCurso}
                onChange={(e) => setSelectedCurso(e.target.value)}
                disabled={isFiltrosDisabled}
              >
                {CURSOS_PERMITIDOS.map((curso) => (
                  <option key={curso} value={curso}>
                    {curso}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón Visualizar */}
          <div className="mt-8 text-center">
            <button
              onClick={handleVisualizarClick}
              className="bg-[#1572E8] text-white py-3 px-6 rounded-lg font-semibold"
            >
              Visualizar
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 text-xl font-bold flex justify-end">
        <button
          onClick={rolnavigation}
          className="bg-[#1572E8] px-4 py-2 rounded-lg hover:bg-[#0f5fc7] transition duration-300"
        >
          Volver
        </button>
      </footer>
    </div>
  );
}