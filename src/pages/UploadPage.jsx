import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export function UploadPage() {
  const [status, setStatus] = useState({ a: false, b: false });
  const [loading, setLoading] = useState({ a: false, b: false });

  const handleFile = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(l => ({ ...l, [type]: true }));
    let form = new FormData();
    form.append('file', file);
    try {
      await axios.post(`http://localhost:8000/api/upload/${type}/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success(`Archivo ${type.toUpperCase()} cargado`, { position: 'top-center' });
      setStatus(s => ({ ...s, [type]: true }));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al subir', { position: 'top-center' });
    } finally {
      setLoading(l => ({ ...l, [type]: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-6">Cargar Archivos CSV</h2>
      {['a','b'].map(type => (
        <div key={type} className="mb-4">
          <label className="block mb-2 font-semibold">Archivo {type.toUpperCase()}:</label>
          <input
            type="file"
            accept=".csv"
            onChange={e => handleFile(e, type)}
            disabled={loading[type]}
          />
          {loading[type] && <span className="ml-2">Subiendo…</span>}
          {status[type]  && <span className="ml-2 text-green-600">✔ Cargado</span>}
        </div>
      ))}
      <button
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        onClick={() => window.location.href = '/dashboard'}
      >
        Volver al Dashboard
      </button>
    </div>
  );
}
