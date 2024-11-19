import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CertificateInputForm from './components/CertificateInputForm';
import CertificateDetails from './components/CertificateDetails';
import CertificatePDFViewer from './components/CertificatePDFViewer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CertificateInputForm />} />
        <Route path="/certificate/:code" element={<CertificateDetails />} />
        <Route path="/certificate/:code/pdf" element={<CertificatePDFViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
