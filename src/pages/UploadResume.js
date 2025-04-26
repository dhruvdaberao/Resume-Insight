



import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UploadResume.css";

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];

    if (file && file.type !== "application/pdf") {
      setMessage("❌ Only PDF files are supported.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setMessage(""); // Clear previous messages
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("❌ Please select a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("https://resume-insight-e8tl.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.error) {
        setMessage("❌ " + response.data.error);
      } else {
        setMessage("✅ File uploaded successfully!");
        setFileUploaded(true);
        console.log(response.data)
      }
    } catch (error) {
      setMessage("❌ Server error: " + (error.response?.data?.error || "Upload failed."));
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="upload-page">
    //   <h2 className="title">Upload Your Resume</h2>
    //   <p className="subtitle">Only PDF format is supported.</p>
    //   <div className="upload-controls">
    //     <input type="file" accept=".pdf" onChange={handleFileChange} className="file-input" />
    //     <button onClick={handleUpload} className="upload-button" disabled={loading || !selectedFile}>
    //       {loading ? "Uploading..." : "Upload"}
    //     </button>
    //   </div>
    //   <p className="message">{message}</p>
    //   {fileUploaded && (
    //     <button onClick={() => navigate("/companyPage")} className="navigate-button">
    //       Click here to select a company
    //     </button>
    //   )}
    // </div>
<div className="upload-page">

{/* Top Heading Section */}
<div className="top-heading">
  <h1 className="main-heading">📝 Resume Insight</h1>
  <p className="sub-heading">Get your resume analyzed in seconds and land your dream job faster! 🧑‍💻</p>
</div>

{/* Moved Site Info */}
<p className="site-info">
  Upload your resume and get AI-powered insights to improve your chances. Simple, secure, and completely free!
</p>

{/* Upload Section */}
<h2 className="title">Upload Your Resume</h2>
<p className="subtitle">Only PDF format is supported.</p>

<div className="upload-controls">
  <input type="file" accept=".pdf" onChange={handleFileChange} className="file-input" />
  <button onClick={handleUpload} className="upload-button" disabled={loading || !selectedFile}>
    {loading ? "Uploading..." : "Upload"}
  </button>
</div>

<p className="message">{message}</p>

{fileUploaded && (
  <button onClick={() => navigate("/companyPage")} className="navigate-button">
    Select a Company
  </button>
)}

{/* Cards Section */}
<div className="cards-container">
  {/* Why Use Resume Insight */}
  <div className="info-card fade-in-left">
    <h2 className="card-heading">✨ Why Use US?</h2>
    <ul className="card-list">
      <li>✅ Instant feedback to enhance your resume.</li>
      <li>✅ AI-powered suggestions to land interviews faster.</li>
      <li>✅ Totally free, forever — no hidden charges.</li>
      <li>✅ Secure handling of your private data.</li>
      <li>✅ Easy-to-use platform for everyone.</li>
    </ul>
  </div>

  {/* How It Works */}
  <div className="info-card fade-in-right">
  <h2 className="card-heading">🛠️ How It Works</h2>
  <ul className="card-list">
    <li>📥 Upload your PDF resume.</li>
    <li>🔍 Get immediate insights & feedback.</li>
    <li>💡 See suggestions for improvements.</li>
    <li>🚀 Apply confidently with your new resume!</li>
    <li>📈 Track your success and improve continuously.</li>
  </ul>
</div>

</div>

</div>


  );
};

export default UploadResume;
