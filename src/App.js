



// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import UploadResume from "./pages/UploadResume";
// import CompanyPage from "./pages/CompanyPage"; 

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UploadResume />} />
//         <Route path="/companyPage" element={<CompanyPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import UploadResume from "./pages/UploadResume";
// import CompanyPage from "./pages/CompanyPage";
// import AnalyzerPage from "./pages/AnalyzerPage"; // Import AnalyzerPage

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UploadResume />} />
//         <Route path="/companyPage" element={<CompanyPage />} />
//         <Route path="/analyzerPage" element={<AnalyzerPage />} /> {/* Add this */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import UploadResume from "./pages/UploadResume";
// import CompanyPage from "./pages/CompanyPage";
// import AnalyzerPage from "./pages/AnalyzerPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UploadResume />} />
//         <Route path="/companyPage" element={<CompanyPage />} />
//         <Route path="/analyzer" element={<AnalyzerPage />} /> {/* Ensure path consistency */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import UploadResume from "./pages/UploadResume";
// import CompanyPage from "./pages/CompanyPage";
// import AnalyzerPage from "./pages/AnalyzerPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UploadResume />} />
//         <Route path="/companyPage" element={<CompanyPage />} />
//         <Route path="/analyzer" element={<AnalyzerPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




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
