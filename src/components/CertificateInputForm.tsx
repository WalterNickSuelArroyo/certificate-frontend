import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importa la imagen desde tu proyecto
import bannerImage from '../assets/banner-1ff.png'; // Ajusta la ruta según tu estructura

const CertificateInputForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!code.trim()) {
      setError('Por favor, ingrese un código válido.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await axios.get(`https://certificate-backend-tdjz.onrender.com/api/certificates/${code}`);
      navigate(`/certificate/${code}`);
    } catch {
      setError('El certificado no existe. Verifique el código ingresado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Banner Superior */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '40vh', // Siempre ocupa el 50% de la altura del viewport
          display: 'flex',
          justifyContent: 'center', // Centra la imagen horizontalmente
          alignItems: 'center', // Centra la imagen verticalmente
          overflow: 'hidden',
        }}
      >
        <img
          src={bannerImage}
          alt="Banner"
          style={{
            width: '100%', // La imagen siempre ocupa todo el ancho
            height: '100%', // La imagen siempre ocupa toda la altura
            objectFit: 'cover', // Ajusta la imagen para cubrir el contenedor sin distorsionarse
          }}
        />
      </div>

      {/* Formulario */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Código:</span>
          <input
            type="text"
            placeholder="Ingrese el código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        {/* Mensaje de error */}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {/* Botón Verificar */}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleVerify}
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              backgroundColor: loading ? '#d3d3d3' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              transition: 'transform 0.2s, background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#c82333';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#dc3545';
            }}
          >
            {loading ? 'Verificando...' : 'Verificar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateInputForm;
