import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CertificateDetails: React.FC = () => {
  const { code } = useParams<{ code: string }>(); // Código del certificado desde la URL
  const [certificate, setCertificate] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificateDetails = async () => {
      try {
        const response = await axios.get(`https://certificate-backend-tdjz.onrender.com/api/certificates/${code}`);
        setCertificate(response.data);
      } catch (err: any) {
        setError('No se encontró el certificado. Por favor, verifica el código.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateDetails();
  }, [code]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Detalles del Certificado</h1>
      <p><strong>Nombre Completo:</strong> {certificate.full_name}</p>
      <p><strong>Nombre del Certificado:</strong> {certificate.certificate_name}</p>
      <p><strong>Fecha de Emisión:</strong> {certificate.issue_date}</p>
      <p><strong>Fecha de Expiración:</strong> {certificate.expiry_date}</p>
      <p><strong>Estado:</strong> {certificate.status}</p>

      {/* Botón para ver el certificado en PDF */}
      <button
        onClick={() => navigate(`/certificate/${code}/pdf`)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '20px',
        }}
      >
        Ver Certificado
      </button>
    </div>
  );
};

export default CertificateDetails;
