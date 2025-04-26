



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
    <div className="upload-page">
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
          Click here to select a company
        </button>
      )}
    </div>
  );
};

export default UploadResume;
