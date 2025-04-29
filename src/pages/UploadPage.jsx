import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export function UploadPage() {
  const [status, setStatus] = useState({ a: false, b: false });
  const [loading, setLoading] = useState({ a: false, b: false });
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
      setUser(fetchedUser);
    }
    fetchUser();
  }, []);

  const handleFile = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading((l) => ({ ...l, [type]: true }));
    let form = new FormData();
    form.append('file', file);
    try {
      await axios.post(`http://localhost:8000/api/upload/${type}/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(`Archivo ${type.toUpperCase()} cargado`, { position: 'top-center' });
      setStatus((s) => ({ ...s, [type]: true }));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al subir', { position: 'top-center' });
    } finally {
      setLoading((l) => ({ ...l, [type]: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#d7e9ff] to-[#f5faff]">
      {/* Header */}
      <div className="flex w-full">
        <div className="bg-[#1572E8] text-white py-4 px-4 text-xl font-bold w-1/5 flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold mb-4">
              {user && user.nombre ? user.nombre : 'Desconocido'}
            </h1>
            <p className="text-base">{user ? user.rol : 'Desconocido'}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-8 px-8 text-xl font-bold w-4/5 flex justify-start items-center">
          <h1 className="text-xl font-semibold">Cargar Archivos CSV</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow flex flex-col items-center justify-center py-12">
        <div className="bg-white w-full max-w-xl p-8 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-[#00498B]">Sube tus archivos:</h2>
          {['a', 'b'].map((type) => (
            <div key={type} className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Archivo {type.toUpperCase()}:
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFile(e, type)}
                disabled={loading[type]}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1572E8] focus:border-transparent"
              />
              <div className="mt-2">
                {loading[type] && <span className="text-yellow-500">Subiendo…</span>}
                {status[type] && <span className="text-green-600 font-semibold">✔ Cargado</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 flex justify-end">
        <button
          className="bg-[#1572E8] px-4 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300"
          onClick={() => (window.location.href = '/dashboard')}
        >
          Volver al Dashboard
        </button>
      </footer>
    </div>
  );
}