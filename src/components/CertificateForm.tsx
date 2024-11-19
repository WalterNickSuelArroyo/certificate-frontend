import React, { useState } from 'react';
import axios from 'axios';

const CertificateForm: React.FC = () => {
    const [code, setCode] = useState('');
    const [certificate, setCertificate] = useState<any>(null);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        try {
            // Llamada al backend para verificar el certificado
            const response = await axios.get(`http://localhost:5000/api/verify/${code}`);
            setCertificate(response.data);
            setError('');
        } catch (err) {
            setError('Certificate not found');
            setCertificate(null);
        }
    };

    return (
        <div>
            <h1>Verify Certificate</h1>
            <input 
                type="text" 
                placeholder="Enter certificate code" 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
            />
            <button onClick={handleVerify}>Verify</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {certificate && (
                <div>
                    <h2>Certificate Details</h2>
                    <p><strong>Name:</strong> {certificate.full_name}</p>
                    <p><strong>Certificate Name:</strong> {certificate.certificate_name}</p>
                    <p><strong>Issue Date:</strong> {certificate.issue_date}</p>
                    <p><strong>Expiry Date:</strong> {certificate.expiry_date}</p>
                    <p><strong>Status:</strong> {certificate.status}</p>
                    <a href={certificate.pdf_url} target="_blank" rel="noopener noreferrer">
                        View Certificate
                    </a>
                </div>
            )}
        </div>
    );
};

export default CertificateForm;
