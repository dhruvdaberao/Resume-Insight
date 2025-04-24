import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import "../styles/AnalyzerPage.css";

const AnalyzerPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const company = queryParams.get("company");

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!company) return;
            try {
                const response = await fetch("https://resume-insight-e8tl.onrender.com/get_company_scores", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ company })
                });

                if (!response.ok) throw new Error("Failed to fetch results");

                const data = await response.json();
                setResult(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [company]);

    return (
        <div className="analyzer-page">
            <h1 className="analyzer-title">
                {company ? `${company} Resume Analysis` : "GitHub Resume Analysis"}
            </h1>

            {loading && <CircularProgress size={60} className="loading-spinner" />}
            {error && <Typography className="error-message">⚠️ {error}</Typography>}

            {result && (
                <Box className="results-container">
                    {/* Score Circle */}
                    <div className="score-circle">
                        <Typography variant="h6">Score</Typography>
                        <div className="circle">
                            <Typography variant="h4" className="score-text">{result.selected_score}%</Typography>
                        </div>
                    </div>

                    {/* Competing Companies */}
                    <div className="competing-companies">
                        <Typography variant="h6">Other Recommended Companies:</Typography>
                        <div className="company-list">
                            {result.top_companies.map(([comp, score], index) => (
                                <div key={index} className="company-score">
                                    <Typography variant="body1">{comp}</Typography>
                                    <div className="mini-circle">{score}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Box>
            )}

            <Button className="back-button" variant="contained" onClick={() => window.history.back()}>
                Go Back
            </Button>
        </div>
    );
};

export default AnalyzerPage;
