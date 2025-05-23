import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function UploadPage() {
  // estados de carga de CSV
  const [status, setStatus]   = useState({ a: false, b: false, prerrequisitos: false });
  const [loading, setLoading] = useState({ a: false, b: false, prerrequisitos: false });

  // modal de proyección
  const [modalOpen, setModalOpen] = useState(false);
  const [anio, setAnio]           = useState(new Date().getFullYear());
  const [periodo, setPeriodo]     = useState(1);
  const [version, setVersion]     = useState('Final'); // <— Añadido: controla si es Prelim o final

  // usuario autenticado
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    setUser(u);
  }, []);

  // subir CSV (a, b o prerrequisitos)
  const handleFile = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(l => ({ ...l, [type]: true }));
    const form = new FormData();
    form.append('file', file);

    try {
      await axios.post(`http://localhost:8000/api/upload/${type}/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(`Archivo ${type.toUpperCase()} cargado`);
      setStatus(s => ({ ...s, [type]: true }));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al subir');
    } finally {
      setLoading(l => ({ ...l, [type]: false }));
    }
  };

  // abrir modal de Proyección, diferenciando versión
  const openModal = (ver) => {
    setVersion(ver);   // <— Establece 'Preliminar' o 'Final'
    setModalOpen(true);
  };

  // confirmar generación de Proyección
  const handleConfirm = async () => {
    // <— Elegir ruta según version
    const url =
      version === 'Preliminar'
        ? '/api/proyecciones/proyeccionesPreyFin/generate_preliminar/'
        : '/api/proyecciones/proyeccionesPreyFin/generate/';

    try {
      await axios.post(
        `http://localhost:8000${url}`,
        { anio, periodo, version },
        { headers: { Authorization: `Token ${Cookies.get('token')}` } }
      );
      toast.success(`Proyección ${version.toLowerCase()} generada`);
      setModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.error || `Error al generar proyección ${version.toLowerCase()}`);
    }
  };

  // configuracion de uploads
  const uploads = [
    { key: 'a', label: 'Cursos (file A)' },
    { key: 'b', label: 'Comportamiento (file B)' },
    { key: 'prerrequisitos', label: 'Prerrequisitos' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#d7e9ff] to-[#f5faff]">
      {/* Header */}
      <div className="flex w-full">
        <div className="bg-[#1572E8] text-white py-4 px-4 text-xl font-bold w-1/5 flex items-center">
          <div>
            <h1 className="text-xl font-bold mb-1">
              {user?.nombre || 'Desconocido'}
            </h1>
            <p className="text-base">{user?.rol || 'Desconocido'}</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-8 px-8 text-xl font-bold w-4/5 flex items-center">
          <h1 className="text-xl font-semibold">Cargar Archivos CSV</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow flex flex-col items-center justify-center py-12">
        <div className="bg-white w-full max-w-xl p-8 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-[#00498B]">Sube tus archivos:</h2>

          {uploads.map(({ key, label }) => (
            <div key={key} className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                {label}
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFile(e, key)}
                disabled={loading[key]}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1572E8] focus:border-transparent"
              />
              <div className="mt-2">
                {loading[key] && <span className="text-yellow-500">Subiendo…</span>}
                {status[key]  && <span className="text-green-600 font-semibold">✔ Cargado</span>}
              </div>
            </div>
          ))}

          {/* Botones de proyección */}
          <div className="mt-8 flex flex-col space-y-4">
            <button
              onClick={() => openModal('Preliminar')}   // <— Ahora abre modal en modo “Preliminar”
              className="w-full bg-[#1572E8] text-white py-2 rounded-lg hover:bg-[#0f5fc7] transition-all duration-300"
            >
              Realizar Proyección Preliminar
            </button>
            <button
              onClick={() => openModal('Final')}         // <— Y aquí en modo “Final”
              className="w-full bg-[#1572E8] text-white py-2 rounded-lg hover:bg-[#0f5fc7] transition-all duration-300"
            >
              Realizar Proyección Final
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Proyección */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white p-8 max-w-md mx-auto mt-20 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Nueva Proyección {version}</h2>

        <label>Año:</label>
        <input
          type="number"
          value={anio}
          onChange={(e) => setAnio(+e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label>Periodo:</label>
        <select
          value={periodo}
          onChange={(e) => setPeriodo(+e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>

        <label>Versión:</label>
        <input
          type="text"
          value={version}
          disabled
          className="w-full p-2 mb-6 border rounded bg-gray-200"
        />

        <div className="flex justify-end space-x-2">
          <button onClick={() => setModalOpen(false)} className="px-4 py-2">
            Cancelar
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded">
            Confirmar
          </button>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#00498B] to-[#001325] text-white py-4 px-8 flex justify-end">
        <button
          className="bg-[#1572E8] px-4 py-2 rounded-lg text-white hover:bg-[#0f5fc7] transition-all duration-300"
          onClick={() => (window.location.href = '/dashboard')}
        >
          Volver
        </button>
      </footer>
    </div>
  );
}
