


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import "../styles/AnalyzerPage.css";

// Company logo mapping
const companyLogos = {
    "Google": "https://logo.clearbit.com/google.com",
    "Microsoft": "https://logo.clearbit.com/microsoft.com",
    "Amazon": "https://logo.clearbit.com/amazon.com",
    "Apple": "https://logo.clearbit.com/apple.com",
    "Facebook": "https://logo.clearbit.com/facebook.com",
    "Tesla": "https://logo.clearbit.com/tesla.com",
    "Netflix": "https://logo.clearbit.com/netflix.com",
    "IBM": "https://logo.clearbit.com/ibm.com",
    "Intel": "https://logo.clearbit.com/intel.com",
    "Oracle": "https://logo.clearbit.com/oracle.com",
    "Adobe": "https://logo.clearbit.com/adobe.com",
    "Salesforce": "https://logo.clearbit.com/salesforce.com",
    "SAP": "https://logo.clearbit.com/sap.com",
    "Uber": "https://logo.clearbit.com/uber.com",
    "Twitter": "https://logo.clearbit.com/twitter.com",
    "LinkedIn": "https://logo.clearbit.com/linkedin.com",
    "Spotify": "https://logo.clearbit.com/spotify.com",
    "Airbnb": "https://logo.clearbit.com/airbnb.com",
    "Zoom": "https://logo.clearbit.com/zoom.us",
    "Nvidia": "https://logo.clearbit.com/nvidia.com",
    "Cisco": "https://logo.clearbit.com/cisco.com",
    "PayPal": "https://logo.clearbit.com/paypal.com",
    "SpaceX": "https://logo.clearbit.com/spacex.com",
    "OpenAI": "https://logo.clearbit.com/openai.com",
    "Dell": "https://logo.clearbit.com/dell.com",
    "HP": "https://logo.clearbit.com/hp.com",
    "Sony": "https://logo.clearbit.com/sony.com",
    "Samsung": "https://logo.clearbit.com/samsung.com",
    "Qualcomm": "https://logo.clearbit.com/qualcomm.com",
    "Red Hat": "https://logo.clearbit.com/redhat.com",
    "Dropbox": "https://logo.clearbit.com/dropbox.com",
    "GitHub": "https://logo.clearbit.com/github.com",
    "Siemens": "https://logo.clearbit.com/siemens.com",
    "Huawei": "https://logo.clearbit.com/huawei.com",
    "Nokia": "https://logo.clearbit.com/nokia.com",
    "Epic Games": "https://logo.clearbit.com/epicgames.com",
    "Stripe": "https://logo.clearbit.com/stripe.com",
    "Square": "https://logo.clearbit.com/squareup.com",
    "Atlassian": "https://logo.clearbit.com/atlassian.com",
    "Waymo": "https://logo.clearbit.com/waymo.com"
  };
  

const AnalyzerPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get("company");

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      if (!company) return;
      try {
        const response = await fetch("https://resume-insight-e8tl.onrender.com/get_company_scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ company }),
        });

        if (!response.ok) throw new Error("Failed to fetch results");

        const data = await response.json();
        setResult(data);
        animateScore(data.selected_score);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [company]);

  const animateScore = (target) => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setAnimatedScore(current);
      if (current >= target) clearInterval(interval);
    }, 15);
  };

  const renderSuggestions = () => {
    return (
      <ul className="suggestions-list">
        <li>📈 Improve CGPA above 8.0 to boost match score</li>
        <li>💼 Add 2–3 relevant internships or live projects</li>
        <li>📚 Include in-demand skills like DSA, React, or Python</li>
        <li>🎓 Add academic achievements from 10th and 12th grade</li>
        <li>📄 Update resume keywords to match job description</li>
      </ul>
    );
  };

  return (
    <div className="analyzer-page">
      <Typography variant="h3" className="page-heading">
        Analysis Results
      </Typography>
      <Typography variant="h6" className="page-subheading">
        Tailored analysis and suggestions for your selected company
      </Typography>

      {loading && <CircularProgress size={60} className="loading-spinner" />}
      {error && <Typography className="error-message">⚠️ {error}</Typography>}

      {result && (
        <>
          {/* Score Section as a Bar */}
          <Box className="results-container">
            <Typography variant="h6" className="score-heading">
              Your Matching Score
            </Typography>
            <div className="score-bar-container">
              <div className="score-bar-background">
                <div
                  className="score-bar"
                  style={{ width: `${animatedScore}%` }}
                />
              </div>
              <Typography variant="h5" className="score-text">
                {animatedScore}% for {company}
              </Typography>
            </div>
          </Box>

          {/* Suggested Companies */}
          <div className="competing-companies">
            <Typography variant="h6" className="score-heading">
              Other Top Matching Companies for Your Resume
            </Typography>
            <div className="company-list">
              {result.top_companies.map(([comp, score], index) => (
                <div key={index} className="company-score">
                  <div className="company-info">
                    <img
                      src={companyLogos[comp] || "https://via.placeholder.com/30"}
                      alt={comp}
                      className="company-logo"
                    />
                    <Typography variant="body1">{comp}</Typography>
                  </div>
                  <Tooltip title="Matching Score">
                    <div className="score-mini-circle">{score}%</div>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions Section */}
          <div className="suggestions-container">
            <Typography variant="h6" className="score-heading">
              🛠️ Tips to Improve Your Match
            </Typography>
            {renderSuggestions()}
          </div>
        </>
      )}

      <Button className="back-button" variant="contained" onClick={() => window.history.back()}>
        ← Go Back
      </Button>
    </div>
  );
};

export default AnalyzerPage;
