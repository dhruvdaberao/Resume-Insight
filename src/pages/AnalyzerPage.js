// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { CircularProgress, Typography, Box, Button } from "@mui/material";
// import "../styles/AnalyzerPage.css";

// const AnalyzerPage = () => {
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const company = queryParams.get("company");

//     const [loading, setLoading] = useState(true);
//     const [result, setResult] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchResults = async () => {
//             if (!company) return;
//             try {
//                 const response = await fetch("https://resume-insight-e8tl.onrender.com/get_company_scores", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ company })
//                 });

//                 if (!response.ok) throw new Error("Failed to fetch results");

//                 const data = await response.json();
//                 setResult(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchResults();
//     }, [company]);

//     return (
//         <div className="analyzer-page">
//             <h1 className="analyzer-title">
//                 {company ? `${company} Resume Analysis` : "GitHub Resume Analysis"}
//             </h1>

//             {loading && <CircularProgress size={60} className="loading-spinner" />}
//             {error && <Typography className="error-message">⚠️ {error}</Typography>}

//             {result && (
//                 <Box className="results-container">
//                     {/* Score Circle */}
//                     <div className="score-circle">
//                         <Typography variant="h6">Score</Typography>
//                         <div className="circle">
//                             <Typography variant="h4" className="score-text">{result.selected_score}%</Typography>
//                         </div>
//                     </div>

//                     {/* Competing Companies */}
//                     <div className="competing-companies">
//                         <Typography variant="h6">Other Recommended Companies:</Typography>
//                         <div className="company-list">
//                             {result.top_companies.map(([comp, score], index) => (
//                                 <div key={index} className="company-score">
//                                     <Typography variant="body1">{comp}</Typography>
//                                     <div className="mini-circle">{score}%</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </Box>
//             )}

//             <Button className="back-button" variant="contained" onClick={() => window.history.back()}>
//                 Go Back
//             </Button>
//         </div>
//     );
// };

// export default AnalyzerPage;



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
  Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  Amazon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  Microsoft: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  Facebook: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  Apple: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  Tesla: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  Netflix: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  IBM: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  Intel: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg",
  Oracle: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
  Adobe: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Adobe_Corporate_Logo.png",
  Salesforce: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Salesforce.com_logo.svg",
  SAP: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
  Uber: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
  Twitter: "https://upload.wikimedia.org/wikipedia/en/9/9f/Twitter_bird_logo_2012.svg",
  LinkedIn: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg",
  Spotify: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  Airbnb: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  Zoom: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Zoom_Communications_Logo.svg",
  Nvidia: "https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg",
  Cisco: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Cisco_logo_blue_2016.svg",
  PayPal: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  SpaceX: "https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg",
  OpenAI: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
  Dell: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
  HP: "https://upload.wikimedia.org/wikipedia/commons/4/4f/HP_logo_2012.svg",
  Sony: "https://upload.wikimedia.org/wikipedia/commons/2/20/Sony_Logo.svg",
  Samsung: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  Qualcomm: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Qualcomm_Logo_2018.svg",
  RedHat: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Red_Hat_logo.svg",
  Dropbox: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dropbox_logo_2017.svg",
  GitHub: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  Siemens: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Siemens_AG_logo.svg",
  Huawei: "https://upload.wikimedia.org/wikipedia/commons/0/04/Huawei_logo_2018.svg",
  Nokia: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Nokia_wordmark.svg",
  EpicGames: "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg",
  Stripe: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Stripe_Logo%2C_revised_2016.svg",
  Square: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Square%2C_Inc._logo.svg",
  Atlassian: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Atlassian-logo.svg",
  Waymo: "https://upload.wikimedia.org/wikipedia/commons/1/10/Waymo_logo.svg"
  // Add more as needed
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
      <h1 className="analyzer-title">🚀 Resume Analyzer Results</h1>
      <Typography variant="subtitle1" className="analyzer-subtext">
        Tailored analysis and suggestions for your selected company
      </Typography>

      {loading && <CircularProgress size={60} className="loading-spinner" />}
      {error && <Typography className="error-message">⚠️ {error}</Typography>}

      {result && (
        <>
          {/* Score Section */}
          <Box className="results-container">
            <div className="score-circle">
              <Typography variant="h6" className="score-heading">
                Your Matching Score
              </Typography>
              <div className="circle animated-score">
                <Typography variant="h4" className="score-text">
                  {animatedScore}%
                </Typography>
              </div>
            </div>

            {/* Suggested Companies */}
            <div className="competing-companies">
              <Typography variant="h6" className="score-heading">
                Top Matching Companies
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
                      <div className="mini-circle">{score}%</div>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          </Box>

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
