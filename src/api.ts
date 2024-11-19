import axios from 'axios';

// Configurar la base URL del backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia la URL al dominio de tu backend cuando lo despliegues
});

export const getCertificateDetails = async (code: string) => {
    try {
      const response = await api.get(`/certificates/${code}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching certificate details:', error);
      throw error.response.data;
    }
  };
  
  export const getCertificatePDF = async (code: string) => {
    try {
      const response = await api.get(`/certificates/${code}/pdf`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching certificate PDF:', error);
      throw error.response.data;
    }
  };

export default api;
