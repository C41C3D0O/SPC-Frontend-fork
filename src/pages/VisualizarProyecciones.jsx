import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ListarProyecciones } from "../components/ListarProyecciones";
import { ListarCursos } from "../components/listarcursos";
import { ListarComportamiento } from "../components/ListarComportamiento";

export function VisualizarProyecciones() {
  const [types, setTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [selectedTipo, setSelectedTipo] = useState("proyecciones");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.filters) {
      setAppliedFilters(location.state.filters);
      setSelectedTipo(location.state.filters.tipo || "proyecciones");
    }

    const fetchedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    setUser(fetchedUser);

    axios.get('http://localhost:8000/api/uploaded/')
      .then(res => setTypes(res.data.types))
      .catch(() => toast.error('Error al listar archivos', { position: 'top-center' }));
  }, [location.state]);

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
      {/* Header */}
      <div className="flex w-full">
        <div className="bg-[#1572E8] text-white py-4 px-6 w-1/5 flex flex-col justify-center">
          <h2 className="text-lg font-bold">{user?.nombre || 'Desconocido'}</h2>
          <p className="text-sm">{user?.rol || 'Desconocido'}</p>
        </div>
        <div className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 w-4/5 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            VISUALIZAR {selectedTipo === "proyecciones" ? "PROYECCIONES" : 
                       selectedTipo === "cursos" ? "CURSOS" : "COMPORTAMIENTO"}
          </h1>
          <div className="w-1/3">
          </div>
        </div>
      </div>

      <div>
        {selectedTipo === "proyecciones" && (
          <ListarProyecciones 
            searchQuery={searchQuery} 
            appliedFilters={appliedFilters} 
          />
        )}
        {selectedTipo === "cursos" && <ListarCursos searchQuery={searchQuery}/>}
        {selectedTipo === "comportamiento" && <ListarComportamiento searchQuery={searchQuery}/>}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 flex justify-end">
        <button
          onClick={() => navigate('/filtro-de-informacion')}
          className="bg-[#1572E8] px-4 py-2 rounded-lg hover:bg-[#0f5fc7] transition duration-300"
        >
          Volver
        </button>
      </footer>
    </div>
  );
}