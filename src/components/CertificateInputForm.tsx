import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CertificateInputForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    // Validar que el campo no esté vacío
    if (!code.trim()) {
      setError('Por favor, ingrese un código válido.');
      return;
    }

    // Limpiar errores anteriores
    setError(null);
    setLoading(true);

    try {
      // Llamar al backend para verificar el código
      await axios.get(`http://localhost:5000/api/certificates/${code}`);
      
      // Si el código es válido, redirigir a la página de detalles
      navigate(`/certificate/${code}`);
    } catch (err) {
      console.error('Error:', err.response || err);
      // Manejar errores (certificado no encontrado u otro problema)
      setError('El certificado no existe. Verifique el código ingresado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Verificar Certificado</h1>
      <input
        type="text"
        placeholder="Ingrese el código del certificado"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginBottom: '20px',
        }}
      />
      <br />
      {/* Mostrar mensaje de error si lo hay */}
      {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
      <button
        onClick={handleVerify}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: loading ? '#d3d3d3' : '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {loading ? 'Verificando...' : 'Verificar'}
      </button>
    </div>
  );
};

export default CertificateInputForm;
