

// import React, { useState } from "react";
// import { Button, Card, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import "../styles/CompanyPage.css";

// const companies = [
//     { name: "Google", role: "Software Engineer", logo: "/images/google.png" },
//     { name: "Microsoft", role: "Data Analyst", logo: "/images/microsoft.png" },
//     { name: "Amazon", role: "Cloud Engineer", logo: "/images/amazon.png" },
//     { name: "Apple", role: "iOS Developer", logo: "/images/apple.png" },
//     { name: "Tesla", role: "AI Researcher", logo: "/images/tesla.png" },
//     { name: "Facebook", role: "Frontend Developer", logo: "/images/meta.png" },
//     { name: "Netflix", role: "Backend Developer", logo: "/images/netflix.png" },
//     { name: "Adobe", role: "UI/UX Designer", logo: "/images/adobe.png" },
//     { name: "Uber", role: "Full Stack Developer", logo: "/images/uber.png" },
//     { name: "Intel", role: "Embedded Engineer", logo: "/images/intel.png" },
// ];

// const CompanyPage = () => {
//     const [selectedCompany, setSelectedCompany] = useState(null);
//     const navigate = useNavigate();

//     const handleCompanySelect = (company) => {
//         setSelectedCompany(company);
//     };

//     const handleAnalyzeClick = () => {
//         if (selectedCompany) {
//             navigate("/analyzer", { state: { company: selectedCompany } });
//         }
//     };

//     return (
//         <div className="company-page">
//             <h1 className="company-title">Select a Company</h1>
//             <h3 className="company-subtitle">Click on a company to proceed with resume analysis.</h3>

//             <Box className="company-grid" >
//                 {companies.map((company, index) => (
                    
//                     <Card
//                         key={index}
//                         style={{padding: "30px", borderRadius: "30px"}}
//                         onClick={() => {
//                             handleCompanySelect(company)
//                         }}
//                     >
//                         <img src={company.logo} alt={company.name} className="company-logo" />
//                         <Typography variant="h6" className="company-name">
//                             {company.name}
//                         </Typography>
//                         <Typography variant="body2" className="company-role">
//                             {company.role}
//                         </Typography>
//                     </Card>
//                 ))}
//             </Box>

//             <Button
//                 variant="contained"
//                 className={`analyze-button ${selectedCompany ? "" : "disabled-button"}`}
//                 onClick={handleAnalyzeClick}
//                 disabled={!selectedCompany} 
//             >
//                 {selectedCompany ? `Analyze Resume for ${selectedCompany.name}` : "Select a company to proceed"}
//             </Button>
//         </div>
//     );
// };

// export default CompanyPage;





// import React, { useState } from "react";
// import { Button, Card, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import "../styles/CompanyPage.css";

// const companies = [
//     { name: "Google", role: "Software Engineer", logo: "/images/google.png" },
//     { name: "Microsoft", role: "Data Analyst", logo: "/images/microsoft.png" },
//     { name: "Amazon", role: "Cloud Engineer", logo: "/images/amazon.png" },
//     { name: "Apple", role: "iOS Developer", logo: "/images/apple.png" },
//     { name: "Facebook", role: "Frontend Developer", logo: "/images/meta.png" },
//     { name: "Tesla", role: "AI Researcher", logo: "/images/tesla.png" },
//     { name: "Netflix", role: "Backend Developer", logo: "/images/netflix.png" },
//     { name: "IBM", role: "Machine Learning Engineer", logo: "/images/ibm.png" },
//     { name: "Intel", role: "Embedded Engineer", logo: "/images/intel.png" },
//     { name: "Oracle", role: "Database Administrator", logo: "/images/oracle.png" },
//     { name: "Adobe", role: "UI/UX Designer", logo: "/images/adobe.png" },
//     { name: "Salesforce", role: "CRM Developer", logo: "/images/salesforce.png" },
//     { name: "SAP", role: "ERP Consultant", logo: "/images/sap.png" },
//     { name: "Uber", role: "Full Stack Developer", logo: "/images/uber.png" },
//     { name: "Twitter", role: "Social Media Analyst", logo: "/images/twitter.png" },
//     { name: "LinkedIn", role: "Business Intelligence Analyst", logo: "/images/linkedin.png" },
//     { name: "Spotify", role: "Music Data Analyst", logo: "/images/spotify.png" },
//     { name: "Airbnb", role: "Hospitality Tech Engineer", logo: "/images/airbnb.png" },
//     { name: "Zoom", role: "Video Conferencing Engineer", logo: "/images/zoom.png" },
//     { name: "Nvidia", role: "GPU Architect", logo: "/images/nvidia.png" },
//     { name: "Cisco", role: "Network Security Engineer", logo: "/images/cisco.png" },
//     { name: "PayPal", role: "FinTech Developer", logo: "/images/paypal.png" },
//     { name: "SpaceX", role: "Aerospace Engineer", logo: "/images/spacex.png" },
//     { name: "OpenAI", role: "AI Research Scientist", logo: "/images/openai.png" },
//     { name: "Dell", role: "Hardware Engineer", logo: "/images/dell.png" },
//     { name: "HP", role: "System Administrator", logo: "/images/hp.png" },
//     { name: "Sony", role: "Game Developer", logo: "/images/sony.png" },
//     { name: "Samsung", role: "Chip Designer", logo: "/images/samsung.png" },
//     { name: "Qualcomm", role: "Wireless Engineer", logo: "/images/qualcomm.png" },
//     { name: "Red Hat", role: "Linux Systems Engineer", logo: "/images/redhat.png" },
//     { name: "Dropbox", role: "Cloud Storage Developer", logo: "/images/dropbox.png" },
//     { name: "GitHub", role: "Version Control Specialist", logo: "/images/github.png" },
//     { name: "Siemens", role: "Industrial Automation Engineer", logo: "/images/siemens.png" },
//     { name: "Huawei", role: "5G Network Engineer", logo: "/images/huawei.png" },
//     { name: "Nokia", role: "Telecom Engineer", logo: "/images/nokia.png" },
//     { name: "Epic Games", role: "Game Engine Developer", logo: "/images/epicgames.png" },
//     { name: "Stripe", role: "Payment Systems Engineer", logo: "/images/stripe.png" },
//     { name: "Square", role: "Retail Software Engineer", logo: "/images/square.png" },
//     { name: "Atlassian", role: "DevOps Engineer", logo: "/images/atlassian.png" },
//     { name: "Waymo", role: "Autonomous Vehicle Engineer", logo: "/images/waymo.png" },
// ];

// const CompanyPage = () => {
//     const [selectedCompany, setSelectedCompany] = useState(null);
//     const navigate = useNavigate();

//     const handleCompanySelect = (company) => {
//         setSelectedCompany(company);
//     };

//     const handleAnalyzeClick = () => {
//         if (selectedCompany) {
//             navigate("/analyzer", { state: { company: selectedCompany } });
//         }
//     };

//     return (
//         <div className="company-page">
//             <h1 className="company-title">Select a Company</h1>
//             <h3 className="company-subtitle">Click on a company to proceed with resume analysis.</h3>

//             <Box className="company-grid">
//                 {companies.map((company, index) => (
//                     <Card 
//                         key={index} 
//                         style={{ padding: "30px", borderRadius: "20px", cursor: "pointer" }}
//                         onClick={() => handleCompanySelect(company)}
//                     >
//                         <img src={company.logo} alt={company.name} className="company-logo" />
//                         <Typography variant="h6" className="company-name">
//                             {company.name}
//                         </Typography>
//                         <Typography variant="body2" className="company-role">
//                             {company.role}
//                         </Typography>
//                     </Card>
//                 ))}
//             </Box>

//             <Button
//                 variant="contained"
//                 className={`analyze-button ${selectedCompany ? "" : "disabled-button"}`}
//                 onClick={handleAnalyzeClick}
//                 disabled={!selectedCompany}
//             >
//                 {selectedCompany ? `Analyze Resume for ${selectedCompany.name}` : "Select a company to proceed"}
//             </Button>
//         </div>
//     );
// };

// export default CompanyPage;




// import React, { useState } from "react";
// import { Button, Card, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import "../styles/CompanyPage.css";

// const companies = [
//     { name: "Google", role: "Software Engineer", logo: "/images/google.png" },
//     { name: "Microsoft", role: "Data Analyst", logo: "/images/microsoft.png" },
//     { name: "Amazon", role: "Cloud Engineer", logo: "/images/amazon.png" },
//     { name: "Apple", role: "iOS Developer", logo: "/images/apple.png" },
//     { name: "Facebook", role: "Frontend Developer", logo: "/images/meta.png" },
//     { name: "Tesla", role: "AI Researcher", logo: "/images/tesla.png" },
//     { name: "Netflix", role: "Backend Developer", logo: "/images/netflix.png" },
//     { name: "IBM", role: "Machine Learning Engineer", logo: "/images/ibm.png" },
//     { name: "Intel", role: "Embedded Engineer", logo: "/images/intel.png" },
//     { name: "Oracle", role: "Database Administrator", logo: "/images/oracle.png" },
//     { name: "Adobe", role: "UI/UX Designer", logo: "/images/adobe.png" },
//     { name: "Salesforce", role: "CRM Developer", logo: "/images/salesforce.png" },
//     { name: "SAP", role: "ERP Consultant", logo: "/images/sap.png" },
//     { name: "Uber", role: "Full Stack Developer", logo: "/images/uber.png" },
//     { name: "Twitter", role: "Social Media Analyst", logo: "/images/twitter.png" },
//     { name: "LinkedIn", role: "Business Intelligence Analyst", logo: "/images/linkedin.png" },
//     { name: "Spotify", role: "Music Data Analyst", logo: "/images/spotify.png" },
//     { name: "Airbnb", role: "Hospitality Tech Engineer", logo: "/images/airbnb.png" },
//     { name: "Zoom", role: "Video Conferencing Engineer", logo: "/images/zoom.png" },
//     { name: "Nvidia", role: "GPU Architect", logo: "/images/nvidia.png" },
//     { name: "Cisco", role: "Network Security Engineer", logo: "/images/cisco.png" },
//     { name: "PayPal", role: "FinTech Developer", logo: "/images/paypal.png" },
//     { name: "SpaceX", role: "Aerospace Engineer", logo: "/images/spacex.png" },
//     { name: "OpenAI", role: "AI Research Scientist", logo: "/images/openai.png" },
//     { name: "Dell", role: "Hardware Engineer", logo: "/images/dell.png" },
//     { name: "HP", role: "System Administrator", logo: "/images/hp.png" },
//     { name: "Sony", role: "Game Developer", logo: "/images/sony.png" },
//     { name: "Samsung", role: "Chip Designer", logo: "/images/samsung.png" },
//     { name: "Qualcomm", role: "Wireless Engineer", logo: "/images/qualcomm.png" },
//     { name: "Red Hat", role: "Linux Systems Engineer", logo: "/images/redhat.png" },
//     { name: "Dropbox", role: "Cloud Storage Developer", logo: "/images/dropbox.png" },
//     { name: "GitHub", role: "Version Control Specialist", logo: "/images/github.png" },
//     { name: "Siemens", role: "Industrial Automation Engineer", logo: "/images/siemens.png" },
//     { name: "Huawei", role: "5G Network Engineer", logo: "/images/huawei.png" },
//     { name: "Nokia", role: "Telecom Engineer", logo: "/images/nokia.png" },
//     { name: "Epic Games", role: "Game Engine Developer", logo: "/images/epicgames.png" },
//     { name: "Stripe", role: "Payment Systems Engineer", logo: "/images/stripe.png" },
//     { name: "Square", role: "Retail Software Engineer", logo: "/images/square.png" },
//     { name: "Atlassian", role: "DevOps Engineer", logo: "/images/atlassian.png" },
//     { name: "Waymo", role: "Autonomous Vehicle Engineer", logo: "/images/waymo.png" },
// ];

// const CompanyPage = () => {
//     const [selectedCompany, setSelectedCompany] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleCompanySelect = (company) => {
//         setSelectedCompany(company);
//     };

//     const handleAnalyzeClick = async () => {
//         if (selectedCompany) {
//             setLoading(true);
//             try {
//                 const response = await fetch("http://localhost:5000/get_results");
//                 const data = await response.json();
//                 const companyData = data.find((c) => c.name === selectedCompany.name);
//                 navigate("/analyzer", {
//                     state: { 
//                         company: selectedCompany, 
//                         score: companyData ? companyData.percentage : "N/A", 
//                         allCompanies: data 
//                     }
//                 });
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="company-page">
//             <h1 className="company-title">Select a Company</h1>
//             <h3 className="company-subtitle">Click on a company to proceed with resume analysis.</h3>

//             <Box className="company-grid">
//                 {companies.map((company, index) => (
//                     <Card 
//                         key={index} 
//                         style={{ padding: "30px", borderRadius: "20px", cursor: "pointer" }}
//                         onClick={() => handleCompanySelect(company)}
//                     >
//                         <img src={company.logo} alt={company.name} className="company-logo" />
//                         <Typography variant="h6" className="company-name">
//                             {company.name}
//                         </Typography>
//                         <Typography variant="body2" className="company-role">
//                             {company.role}
//                         </Typography>
//                     </Card>
//                 ))}
//             </Box>

//             <Button
//                 variant="contained"
//                 className={`analyze-button ${selectedCompany ? "" : "disabled-button"}`}
//                 onClick={handleAnalyzeClick}
//                 disabled={!selectedCompany || loading}
//             >
//                 {loading ? "Analyzing..." : selectedCompany ? `Analyze Resume for ${selectedCompany.name}` : "Select a company to proceed"}
//             </Button>
//         </div>
//     );
// };

// export default CompanyPage;




// import React, { useState } from "react";
// import { Button, Card, Typography, Box } from "@mui/material";
// import "../styles/CompanyPage.css";

// const companies = [
//     { name: "Google", role: "Software Engineer", logo: "/images/google.png" },
//     { name: "Microsoft", role: "Data Analyst", logo: "/images/microsoft.png" },
//     { name: "Amazon", role: "Cloud Engineer", logo: "/images/amazon.png" },
//     { name: "Apple", role: "iOS Developer", logo: "/images/apple.png" },
//     { name: "Facebook", role: "Frontend Developer", logo: "/images/meta.png" },
// ];

// const CompanyPage = () => {
//     const [selectedCompany, setSelectedCompany] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const [error, setError] = useState(null);

//     const handleCompanySelect = (company) => {
//         setSelectedCompany(company);
//         setResult(null);
//         setError(null);
//     };

//     const handleAnalyzeClick = async () => {
//         if (selectedCompany) {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch("http://localhost:5000/get_company_scores", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ company: selectedCompany.name })
//                 });
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch results");
//                 }
//                 const data = await response.json();
//                 setResult(data);
//             } catch (error) {
//                 setError(error.message);
//             }
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="company-page">
//             <h1 className="company-title">Select a Company</h1>
//             <h3 className="company-subtitle">Click on a company to proceed with resume analysis.</h3>

//             <Box className="company-grid">
//                 {companies.map((company, index) => (
//                     <Card 
//                         key={index} 
//                         style={{ padding: "30px", borderRadius: "20px", cursor: "pointer" }}
//                         onClick={() => handleCompanySelect(company)}
//                     >
//                         <img src={company.logo} alt={company.name} className="company-logo" />
//                         <Typography variant="h6" className="company-name">
//                             {company.name}
//                         </Typography>
//                         <Typography variant="body2" className="company-role">
//                             {company.role}
//                         </Typography>
//                     </Card>
//                 ))}
//             </Box>

//             <Button
//                 variant="contained"
//                 className={`analyze-button ${selectedCompany ? "" : "disabled-button"}`}
//                 onClick={handleAnalyzeClick}
//                 disabled={!selectedCompany || loading}
//             >
//                 {loading ? "Analyzing..." : selectedCompany ? `Analyze Resume for ${selectedCompany.name}` : "Select a company to proceed"}
//             </Button>
            
//             {error && <Typography className="error-message">⚠️ {error}</Typography>}
//             {result && (
//                 <div className="result-container">
//                     <Typography variant="h5">Results for {result.selected_company}</Typography>
//                     <Typography variant="h6">Score: {result.selected_score}%</Typography>
//                     <Typography variant="h6">Top Competing Companies:</Typography>
//                     <ul>
//                         {result.top_companies.map(([company, score], index) => (
//                             <li key={index}>{company}: {score}%</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CompanyPage;




// import React, { useState } from "react";
// import { Button, Card, Typography, Box } from "@mui/material";
// import "../styles/CompanyPage.css";

// const companies = [
//     { name: "Google", role: "Software Engineer", logo: "/images/google.png" },
//     { name: "Microsoft", role: "Data Analyst", logo: "/images/microsoft.png" },
//     { name: "Amazon", role: "Cloud Engineer", logo: "/images/amazon.png" },
//     { name: "Apple", role: "iOS Developer", logo: "/images/apple.png" },
//     { name: "Facebook", role: "Frontend Developer", logo: "/images/meta.png" },
//     { name: "Tesla", role: "AI Researcher", logo: "/images/tesla.png" },
//     { name: "Netflix", role: "Backend Developer", logo: "/images/netflix.png" },
//     { name: "IBM", role: "Machine Learning Engineer", logo: "/images/ibm.png" },
//     { name: "Intel", role: "Embedded Engineer", logo: "/images/intel.png" },
//     { name: "Oracle", role: "Database Administrator", logo: "/images/oracle.png" },
//     { name: "Adobe", role: "UI/UX Designer", logo: "/images/adobe.png" },
//     { name: "Salesforce", role: "CRM Developer", logo: "/images/salesforce.png" },
//     { name: "SAP", role: "ERP Consultant", logo: "/images/sap.png" },
//     { name: "Uber", role: "Full Stack Developer", logo: "/images/uber.png" },
//     { name: "Twitter", role: "Social Media Analyst", logo: "/images/twitter.png" },
//     { name: "LinkedIn", role: "Business Intelligence Analyst", logo: "/images/linkedin.png" },
//     { name: "Spotify", role: "Music Data Analyst", logo: "/images/spotify.png" },
//     { name: "Airbnb", role: "Hospitality Tech Engineer", logo: "/images/airbnb.png" },
//     { name: "Zoom", role: "Video Conferencing Engineer", logo: "/images/zoom.png" },
//     { name: "Nvidia", role: "GPU Architect", logo: "/images/nvidia.png" },
//     { name: "Cisco", role: "Network Security Engineer", logo: "/images/cisco.png" },
//     { name: "PayPal", role: "FinTech Developer", logo: "/images/paypal.png" },
//     { name: "SpaceX", role: "Aerospace Engineer", logo: "/images/spacex.png" },
//     { name: "OpenAI", role: "AI Research Scientist", logo: "/images/openai.png" },
//     { name: "Dell", role: "Hardware Engineer", logo: "/images/dell.png" },
//     { name: "HP", role: "System Administrator", logo: "/images/hp.png" },
//     { name: "Sony", role: "Game Developer", logo: "/images/sony.png" },
//     { name: "Samsung", role: "Chip Designer", logo: "/images/samsung.png" },
//     { name: "Qualcomm", role: "Wireless Engineer", logo: "/images/qualcomm.png" },
//     { name: "Red Hat", role: "Linux Systems Engineer", logo: "/images/redhat.png" },
//     { name: "Dropbox", role: "Cloud Storage Developer", logo: "/images/dropbox.png" },
//     { name: "GitHub", role: "Version Control Specialist", logo: "/images/github.png" },
//     { name: "Siemens", role: "Industrial Automation Engineer", logo: "/images/siemens.png" },
//     { name: "Huawei", role: "5G Network Engineer", logo: "/images/huawei.png" },
//     { name: "Nokia", role: "Telecom Engineer", logo: "/images/nokia.png" },
//     { name: "Epic Games", role: "Game Engine Developer", logo: "/images/epicgames.png" },
//     { name: "Stripe", role: "Payment Systems Engineer", logo: "/images/stripe.png" },
//     { name: "Square", role: "Retail Software Engineer", logo: "/images/square.png" },
//     { name: "Atlassian", role: "DevOps Engineer", logo: "/images/atlassian.png" },
//     { name: "Waymo", role: "Autonomous Vehicle Engineer", logo: "/images/waymo.png" },
// ];

// const CompanyPage = () => {
//     const [selectedCompany, setSelectedCompany] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);
//     const [error, setError] = useState(null);

//     const handleCompanySelect = (company) => {
//         setSelectedCompany(company);
//         setResult(null);
//         setError(null);
//     };

//     const handleAnalyzeClick = async () => {
//         if (selectedCompany) {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch("http://localhost:5000/get_company_scores", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ company: selectedCompany.name })
//                 });
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch results");
//                 }
//                 const data = await response.json();
//                 setResult(data);
//             } catch (error) {
//                 setError(error.message);
//             }
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="company-page">
//             <h1 className="company-title">Select a Company</h1>
//             <h3 className="company-subtitle">Click on a company to proceed with resume analysis.</h3>

//             <Box className="company-grid">
//                 {companies.map((company, index) => (
//                     <Card 
//                         key={index} 
//                         style={{ padding: "30px", borderRadius: "20px", cursor: "pointer" }}
//                         onClick={() => handleCompanySelect(company)}
//                     >
//                         <img src={company.logo} alt={company.name} className="company-logo" />
//                         <Typography variant="h6" className="company-name">
//                             {company.name}
//                         </Typography>
//                         <Typography variant="body2" className="company-role">
//                             {company.role}
//                         </Typography>
//                     </Card>
//                 ))}
//             </Box>

//             <Button
//                 variant="contained"
//                 className={`analyze-button ${selectedCompany ? "" : "disabled-button"}`}
//                 onClick={handleAnalyzeClick}
//                 disabled={!selectedCompany || loading}
//             >
//                 {loading ? "Analyzing..." : selectedCompany ? `Analyze Resume for ${selectedCompany.name}` : "Select a company to proceed"}
//             </Button>
            
//             {error && <Typography className="error-message">⚠️ {error}</Typography>}
//             {result && (
//                 <div className="result-container">
//                     <Typography variant="h5">Results for {result.selected_company}</Typography>
//                     <Typography variant="h6">Score: {result.selected_score}%</Typography>
//                     <Typography variant="h6">Top Competing Companies:</Typography>
//                     <ul>
//                         {result.top_companies.map(([company, score], index) => (
//                             <li key={index}>{company}: {score}%</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CompanyPage;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Box } from "@mui/material";
import "../styles/CompanyPage.css";

const companies = [
    { name: "Google", role: "Software Engineer", logo: "https://logo.clearbit.com/google.com" },
    { name: "Microsoft", role: "Data Analyst", logo: "https://logo.clearbit.com/microsoft.com" },
    { name: "Amazon", role: "Cloud Engineer", logo: "https://logo.clearbit.com/amazon.com" },
    { name: "Apple", role: "iOS Developer", logo: "https://logo.clearbit.com/apple.com" },
    { name: "Facebook", role: "Frontend Developer", logo: "https://logo.clearbit.com/facebook.com" },
    { name: "Tesla", role: "AI Researcher", logo: "https://logo.clearbit.com/tesla.com" },
    { name: "Netflix", role: "Backend Developer", logo: "https://logo.clearbit.com/netflix.com" },
    { name: "IBM", role: "Machine Learning Engineer", logo: "https://logo.clearbit.com/ibm.com" },
    { name: "Intel", role: "Embedded Engineer", logo: "https://logo.clearbit.com/intel.com" },
    { name: "Oracle", role: "Database Administrator", logo: "https://logo.clearbit.com/oracle.com" },
    { name: "Adobe", role: "UI/UX Designer", logo: "https://logo.clearbit.com/adobe.com" },
    { name: "Salesforce", role: "CRM Developer", logo: "https://logo.clearbit.com/salesforce.com" },
    { name: "SAP", role: "ERP Consultant", logo: "https://logo.clearbit.com/sap.com" },
    { name: "Uber", role: "Full Stack Developer", logo: "https://logo.clearbit.com/uber.com" },
    { name: "Twitter", role: "Social Media Analyst", logo: "https://logo.clearbit.com/twitter.com" },
    { name: "LinkedIn", role: "Machine Learning Engineer", logo: "https://logo.clearbit.com/linkedin.com" },
    { name: "Spotify", role: "Mobile App Developer", logo: "https://logo.clearbit.com/spotify.com" },
    { name: "Airbnb", role: "React Native Developer", logo: "https://logo.clearbit.com/airbnb.com" },
    { name: "Zoom", role: "Embedded Systems Engineer", logo: "https://logo.clearbit.com/zoom.us" },
    { name: "Nvidia", role: "Microservices Engineer", logo: "https://logo.clearbit.com/nvidia.com" },
    { name: "Cisco", role: "Data Analyst", logo: "https://logo.clearbit.com/cisco.com" },
    { name: "PayPal", role: "Business Intelligence Analyst", logo: "https://logo.clearbit.com/paypal.com" },
    { name: "SpaceX", role: "Data Analyst", logo: "https://logo.clearbit.com/spacex.com" },
    { name: "OpenAI", role: "AI Developer", logo: "https://logo.clearbit.com/openai.com" },
    { name: "Dell", role: "Data Visualization Engineer", logo: "https://logo.clearbit.com/dell.com" },
    { name: "HP", role: "Cloud Computing Engineer", logo: "https://logo.clearbit.com/hp.com" },
    { name: "Sony", role: "DevOps Engineer", logo: "https://logo.clearbit.com/sony.com" },
    { name: "Samsung", role: "Embedded Systems Developer", logo: "https://logo.clearbit.com/samsung.com" },
    { name: "Qualcomm", role: "Embedded Software Engineer", logo: "https://logo.clearbit.com/qualcomm.com" },
    { name: "Red Hat", role: "Deep Learning Engineer", logo: "https://logo.clearbit.com/redhat.com" },
    { name: "Dropbox", role: "Embedded Systems Engineer", logo: "https://logo.clearbit.com/dropbox.com" },
    { name: "GitHub", role: "iOS Developer", logo: "https://logo.clearbit.com/github.com" },
    { name: "Siemens", role: "Django Developer", logo: "https://logo.clearbit.com/siemens.com" },
    { name: "Huawei", role: "Data Scientist", logo: "https://logo.clearbit.com/huawei.com" },
    { name: "Nokia", role: "Embedded C++ Engineer", logo: "https://logo.clearbit.com/nokia.com" },
    { name: "Epic Games", role: "Game Developer", logo: "https://logo.clearbit.com/epicgames.com" },
    { name: "Stripe", role: "Data Analyst", logo: "https://logo.clearbit.com/stripe.com" },
    { name: "Square", role: "Deep Learning Engineer", logo: "https://logo.clearbit.com/squareup.com" },
    { name: "Atlassian", role: "Business Intelligence Analyst", logo: "https://logo.clearbit.com/atlassian.com" },
    { name: "Waymo", role: "Machine Learning Engineer", logo: "https://logo.clearbit.com/waymo.com" }
];




const CompanyPage = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const navigate = useNavigate();

    const handleAnalyzeClick = () => {
        if (selectedCompany) {
            navigate(`/analyzer?company=${encodeURIComponent(selectedCompany.name)}`);
        }
    };

    return (
        <div className="company-page">
            <h1 className="company-title">Select a Company</h1>
            <h3 className="company-subtitle">Click on a company to analyze your resume.</h3>

            <Box className="company-grid">
                {companies.map((company, index) => (
                    <Card 
                        key={index} 
                        className={`company-card ${selectedCompany?.name === company.name ? "selected" : ""}`}
                        onClick={() => setSelectedCompany(company)}
                    >
                        <img src={company.logo} alt={company.name} className="company-logo" />
                        <Typography variant="h6" className="company-name">{company.name}</Typography>
                        <Typography variant="body2" className="company-role">{company.role}</Typography>
                    </Card>
                ))}
            </Box>

            <Button
                variant="contained"
                className={`analyze-button ${selectedCompany ? "" : "disabled-button"}`}
                onClick={handleAnalyzeClick}
                disabled={!selectedCompany}
            >
                {selectedCompany ? `Analyze Resume for ${selectedCompany.name}` : "Select a company to proceed"}
            </Button>
        </div>
    );
};

export default CompanyPage;
