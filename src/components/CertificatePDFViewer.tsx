import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CertificatePDFViewer: React.FC = () => {
  const { code } = useParams<{ code: string }>(); // Código del certificado desde la URL

  useEffect(() => {
    // Redirigir al PDF
    window.location.href = `http://localhost:5000/api/certificates/${code}/pdf`;
  }, [code]);

  return <p style={{ textAlign: 'center', marginTop: '50px' }}>Redirigiendo al PDF...</p>;
};

export default CertificatePDFViewer;
