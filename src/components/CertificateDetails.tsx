import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importa la imagen del banner
import bannerImage from '../assets/banner.png'; // Ajusta la ruta según tu estructura

const CertificateDetails: React.FC = () => {
  const { code } = useParams<{ code: string }>(); // Código del certificado desde la URL
  const [certificate, setCertificate] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    return <p style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#555' }}>Cargando...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center', marginTop: '50px', fontSize: '18px' }}>{error}</p>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Banner Superior */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '40vh', // Ocupa el 50% del viewport
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={bannerImage}
          alt="Banner"
          style={{
            width: '100%', // La imagen ocupa todo el ancho
            height: '100%', // Ocupa el 50% del viewport
            objectFit: 'cover', // Ajusta la imagen para cubrir el contenedor
          }}
        />
      </div>

      {/* Detalles del Certificado */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '50px',
          padding: '20px',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
          border: '1px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h1 style={{
          color: '#2c3e50',
          fontSize: '28px',
          marginBottom: '20px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          borderBottom: '2px solid #e74c3c',
          display: 'inline-block',
          paddingBottom: '5px'
        }}>
          Detalles del Certificado
        </h1>

        <div style={{
          textAlign: 'left',
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{
            margin: '10px 0',
            fontSize: '18px',
            color: '#34495e'
          }}>
            <strong style={{ color: '#34495e' }}>Nombre Completo:</strong> {certificate.full_name}
          </p>
          <p style={{
            margin: '10px 0',
            fontSize: '18px',
            color: '#34495e'
          }}>
            <strong style={{ color: '#34495e' }}>Nombre del Certificado:</strong> {certificate.certificate_name}
          </p>
          <p style={{
            margin: '10px 0',
            fontSize: '18px',
            color: '#34495e'
          }}>
            <strong style={{ color: '#34495e' }}>Fecha de Emisión:</strong> {certificate.issue_date}
          </p>
          <p style={{
            margin: '10px 0',
            fontSize: '18px',
            color: '#34495e'
          }}>
            <strong style={{ color: '#34495e' }}>Fecha de Expiración:</strong> {certificate.expiry_date}
          </p>
          <p style={{
            margin: '10px 0',
            fontSize: '18px',
            color: '#34495e'
          }}>
            <strong style={{ color: '#34495e' }}>Estado:</strong>
            <span style={{
              padding: '5px 10px',
              borderRadius: '5px',
              backgroundColor: certificate.status === 'Activo' ? '#2ecc71' : '#e74c3c',
              color: '#fff',
              marginLeft: '10px'
            }}>
              {certificate.status}
            </span>
          </p>
        </div>


        <button
          onClick={() => window.open(`/certificate/${code}/pdf`, '_blank')}
          style={{
            padding: '12px 25px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#34495e', // Color del botón
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#5d6d7e'; // Color más claro al hacer hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#34495e'; // Regresa al color original
          }}
        >
          Ver Certificado
        </button>

      </div>
    </div>
  );
};

export default CertificateDetails;
