import React, { useState } from "react";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function InformationFilter() {
  const [selectedPrograma, setSelectedPrograma] = useState("Todos");
  const [selectedAño, setSelectedAño] = useState(null);
  const [selectedPeriodo, setSelectedPeriodo] = useState("Todos");
  const [selectedSemestre, setSelectedSemestre] = useState("Todos");
  const [selectedVersion, setSelectedVersion] = useState("Todos");
  const [selectedCurso, setSelectedCurso] = useState("Todos");

  const PROGRAMAS_PERMITIDOS = [
    "Todos",
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
    "Noveno",
    "Décimo",
  ];

  const VERSION_PERMITIDOS = ["Preliminar", "Final"];

  const CURSOS_PERMITIDOS = [
    "Todos",
    "Análisis Numérico",
    "Arquitectura de Computadores",
    "Arquitectura de Sistemas Operativos",
    "Arquitectura de Software",
    "Base de Datos Avanzadas",
    "Base de Datos I",
    "Calidad del Software I",
    "Calidad del Software II",
    "Certificado Actividad Formativa",
    "Complejidad Algorítmica",
    "Cálculo I",
    "Cálculo II",
    "Desarrollo de Aplicaciones Móviles",
    "Desarrollo de Aplicaciones Web",
    "Ecuaciones Diferenciales",
    "Electiva I (Optativa)",
    "Electiva II (Optativa)",
    "Electiva III (Especializada)",
    "Electiva IV (Especializada)",
    "Electiva V (Especializada)",
    "Electiva VI (Especializada)",
    "Estructura de Datos",
    "Física I",
    "Física II",
    "Gestión de Redes",
    "Gestión Tecnológica y Financiera",
    "HCI (Interacción Humano-Computadora)",
    "Ingeniería del Software I",
    "Ingeniería del Software II",
    "Introducción a la Ingeniería",
    "Introducción a la Programación",
    "Matemáticas Discretas",
    "Modelado para la Computación",
    "Probabilidad Computacional y Estadística",
    "Práctica Profesional",
    "Programación I",
    "Programación II",
    "Redes de Computadores",
    "Seguridad Informática",
    "Sistema de Información Empresarial",
    "Teoría de la Computación",
    "Álgebra Lineal",
    "Álgebra Moderna",
  ];

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  const handleProyeccionClick = () => {
    
    console.log("Visualizando proyección con los filtros seleccionados...");
  };

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

          {/* Semestre */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Semestre</label>
            <select
              className="bg-gray-100 p-3 rounded-lg block w-full"
              value={selectedSemestre}
              onChange={(e) => setSelectedSemestre(e.target.value)}
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
            >
              {CURSOS_PERMITIDOS.map((curso) => (
                <option key={curso} value={curso}>
                  {curso}
                </option>
              ))}
            </select>
          </div>

          {/* Botón Visualizar Proyección */}
          <div className="mt-8 text-center">
            <button
              onClick={handleProyeccionClick}
              className="bg-[#1572E8] text-white py-3 px-6 rounded-lg font-semibold"
            >
              Visualizar Proyección
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 text-xl font-bold flex justify-end">
        
        <button className="bg-[#1572E8] px-3 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300">
          Volver
        </button>
      
    </footer>
    </div>
  );
}
