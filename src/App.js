
// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadResume from "./pages/UploadResume";
import CompanyPage from "./pages/CompanyPage";
import AnalyzerPage from "./pages/AnalyzerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadResume />} />
        <Route path="/companyPage" element={<CompanyPage />} />
        <Route path="/analyzer" element={<AnalyzerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
