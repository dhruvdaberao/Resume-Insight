

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
