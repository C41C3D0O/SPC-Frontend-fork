import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function VisualizarProyecciones() {
  const [types, setTypes] = useState([]);
  const [previews, setPreviews] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener tipos disponibles
    axios.get('http://localhost:8000/api/uploaded/')
      .then(res => setTypes(res.data.types))
      .catch(err => toast.error('Error al listar archivos'));
  }, []);

  const fetchPreview = (type) => {
    if (previews[type]) return; // ya cargado
    axios.get(`http://localhost:8000/api/uploaded/${type}/preview/`)
      .then(res => {
        setPreviews(prev => ({ ...prev, [type]: res.data }));
      })
      .catch(err => toast.error(`Error previsualizando ${type}`));
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">Visualizar Proyecciones</h2>
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded"
      >Volver</button>

      {types.length === 0 && <p>No hay archivos cargados.</p>}
      {types.map(type => (
        <div key={type} className="mb-6">
          <h3 className="text-xl font-semibold">Archivo &ldquo;{type}.csv&rdquo;</h3>
          <button
            onClick={() => fetchPreview(type)}
            className="mt-2 mb-4 bg-blue-600 text-white px-3 py-1 rounded"
          >Previsualizar</button>

          {previews[type] && (
            <div className="overflow-auto border rounded">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {previews[type].columns.map(col => (
                      <th key={col} className="px-2 py-1">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previews[type].rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {previews[type].columns.map(col => (
                        <td key={col} className="px-2 py-1">{row[col]}</td>
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
  );
}