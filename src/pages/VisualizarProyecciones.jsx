import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function VisualizarProyecciones() {
  const [types, setTypes] = useState([]);
  const [previews, setPreviews] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    setUser(fetchedUser);

    axios.get('http://localhost:8000/api/uploaded/')
      .then(res => setTypes(res.data.types))
      .catch(() => toast.error('Error al listar archivos', { position: 'top-center' }));
  }, []);

  const fetchPreview = (type) => {
    if (previews[type]) return;
    axios.get(`http://localhost:8000/api/uploaded/${type}/preview/`)
      .then(res => setPreviews(prev => ({ ...prev, [type]: res.data })))
      .catch(() => toast.error(`Error previsualizando ${type}`, { position: 'top-center' }));
  };

  const applyFilters = (rows) => {
    const q = searchQuery.toLowerCase();
    return rows.filter(row =>
      ['Cod_Curso','Semestre','Nom_Curso','Programa'].some(field =>
        row[field]?.toString().toLowerCase().includes(q)
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#d7e9ff] to-[#f5faff]">
      {/* Header */}
      <div className="flex w-full">
        <div className="bg-[#1572E8] text-white py-4 px-6 w-1/5 flex flex-col justify-center">
          <h2 className="text-lg font-bold">{user?.nombre || 'Desconocido'}</h2>
          <p className="text-sm">{user?.rol || 'Desconocido'}</p>
        </div>
        <div className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 w-4/5 flex items-center justify-between">
          <h1 className="text-xl font-semibold">VISUALIZAR PROYECCIONES</h1>
          <div className="w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por Cod_Curso, Semestre, Nom_Curso o Programa"
              className="w-full bg-white text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1572E8]"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-8 space-y-8">
        {types.length === 0 && <p className="text-center">No hay archivos cargados.</p>}
        {types.map(type => (
          <div key={type} className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#00498B]">Archivo “{type}.csv”</h3>
              <button
                onClick={() => fetchPreview(type)}
                className="bg-[#1572E8] text-white px-4 py-2 rounded-lg hover:bg-[#0f5fc7] transition duration-300"
              >
                Previsualizar
              </button>
            </div>
            {previews[type] && (
              <div className="overflow-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-[#00498B] text-white">
                    <tr>
                      {previews[type].columns.map(col => (
                        <th key={col} className="px-4 py-2 text-left">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {applyFilters(previews[type].rows).map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#e3f2ff]'}>
                        {previews[type].columns.map(col => (
                          <td key={col} className="px-4 py-2">{row[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 flex justify-end">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-[#1572E8] px-4 py-2 rounded-lg hover:bg-[#0f5fc7] transition duration-300"
        >
          Volver al Dashboard
        </button>
      </footer>
    </div>
  );
}
