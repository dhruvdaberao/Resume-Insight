# Resume Insight — Comprehensive Technical Documentation

## Document Metadata
- **Project:** Resume Insight
- **Repository Type:** Full-stack web application (React frontend + Flask/Python backend + ML inference layer)
- **Documentation Scope:** Entire repository, including UI, API layer, resume parsing logic, scoring model integration, dataset usage, and deployment workflow.

---

## SECTION 1 — PROJECT INTRODUCTION

### 1.1 Project Name
**Resume Insight** is an AI-assisted resume analysis platform that evaluates a candidate’s profile against multiple target companies and provides a compatibility score with improvement suggestions.

### 1.2 Problem Statement
Hiring pipelines are increasingly automated. Candidates are often filtered by ATS systems and recruiter heuristics before a human review occurs. Most candidates do not know:
- Whether their resume contains relevant keywords.
- Whether their academic profile aligns with target companies.
- How their skills map to role expectations.

Resume Insight addresses this uncertainty by performing structured resume extraction and producing company-wise matching scores.

### 1.3 Challenges Faced by Job Seekers and Recruiters

#### Job seekers
- Resume quality is difficult to self-assess.
- ATS keyword mismatch leads to silent rejections.
- It is unclear which companies best fit one’s profile.
- Iterative resume improvement is time-consuming.

#### Recruiters / HR
- High volume of applications requires automated triage.
- Inconsistent resume formats make extraction hard.
- Skill verification and role-fit estimation are expensive manually.

### 1.4 Why Resume Analysis Tools Are Needed
Resume analysis tools provide:
- **Early screening assistance** for candidates.
- **Data-backed feedback** (not purely subjective advice).
- **Faster shortlist alignment** between skills and target companies.
- **Repeatable evaluation** using the same scoring rules.

### 1.5 How Resume Insight Solves the Problem
Resume Insight implements the following functional chain:
1. User uploads a PDF resume from the frontend upload page.
2. Flask backend stores the PDF and extracts raw text.
3. Regex-based parsers extract education metrics (CGPA, 10th, 12th marks) and a skill set.
4. A pre-trained model (`model.joblib`) predicts fit scores against each company from `companies.csv`.
5. Frontend displays selected-company score + top alternative company matches + generic improvement tips.

### 1.6 Real-World Impact
- Helps students focus on realistic target companies.
- Encourages resume tailoring for ATS and role relevance.
- Supports placement training environments in colleges.
- Can serve as a pre-screening support tool in recruitment operations.

### 1.7 Target Users
- Final-year students
- Fresh graduates
- Job seekers (entry/mid level)
- Placement cell teams
- Recruiters / HR teams (as a decision support layer)

---

## SECTION 2 — PROJECT OBJECTIVES

### 2.1 Core Objectives
1. **Automated resume analysis** — eliminate manual first-pass review.
2. **Skill extraction** — detect technical keywords from resume text.
3. **Resume scoring** — generate a company-specific fit percentage.
4. **Keyword analysis** — infer overlap between resume skills and expected company skill patterns.
5. **ATS compatibility checking (partial)** — enforce PDF input and keyword-oriented analysis.
6. **Career recommendations** — suggest better-fit companies and generic profile improvements.

### 2.2 Candidate Improvement Value
These objectives improve candidate outcomes by:
- Exposing profile gaps quickly.
- Enabling iterative resume edits.
- Guiding skill-building priorities (e.g., Python/React/ML keywords).
- Reducing random applications by promoting profile-company alignment.

---

## SECTION 3 — SYSTEM OVERVIEW

### 3.1 End-to-End Workflow
**User uploads resume → backend processes PDF → text extraction → feature extraction → ML scoring → result retrieval → UI visualization.**

### 3.2 Internal Steps
1. **Frontend upload trigger** from `UploadResume` component.
2. PDF posted as multipart form data to `/upload` endpoint.
3. Backend saves the file under `uploads/`.
4. Backend extracts text (`textextraction.extract_text_from_pdf`).
5. Backend parses resume fields (`newtext.extract_resume_details`).
6. Backend calculates scores for all companies (`predict.score`).
7. Scores cached in global variable `scores` in Flask app.
8. User selects a company in `CompanyPage`.
9. Frontend posts selected company to `/get_company_scores`.
10. Backend returns selected company score + top 5 alternatives.
11. `AnalyzerPage` visualizes score bar, company cards, and tips.

---

## SECTION 4 — TECHNOLOGY STACK

### 4.1 Frontend Stack

#### React (CRA-based)
- Entry: `src/index.js`
- Routing: `src/App.js` (`react-router-dom`)
- Pages: `UploadResume.js`, `CompanyPage.js`, `AnalyzerPage.js`

**Why chosen:** rapid SPA development, component architecture, declarative UI.

**Advantages:** reusable components, smooth routing, state-driven rendering.

**Alternatives:** Vue, Angular, Next.js.

**Why alternatives not used:** repository is structured as classic CRA client-only app; no SSR requirement currently.

#### Material UI (`@mui/material`)
Used for cards/buttons/typography/progress elements.

**Why chosen:** prebuilt UI components, faster styling consistency.

**Alternative:** Bootstrap, Ant Design, Chakra UI.

#### CSS (custom styles)
Page-specific CSS in `src/styles/*` + base `src/index.css`.

**Why chosen:** simple and direct control over visual layout.

### 4.2 Backend Stack

#### Flask (Python)
Main API service: `backend_flask/backend_flask/app.py`.

**Why chosen:** lightweight API server, easy integration with Python ML/NLP stack.

**Alternatives:** FastAPI, Django REST, Node/Express.

**Why not used:** project prioritizes simplicity and direct script-style integration.

#### Flask-CORS
Configured with permissive CORS (`origins: *`) for frontend-backend communication.

### 4.3 AI / NLP Stack

#### PyMuPDF (`fitz`)
Extracts text from uploaded PDFs in parsing scripts.

#### Regex-based NLP extraction
`newtext.py` uses regex patterns for:
- CGPA/GPA extraction
- 10th/12th marks extraction
- fixed skill keyword detection

#### ML inference (`joblib` model)
`predict.py` loads `model.joblib` and predicts fit score per company.

#### String similarity
`python-Levenshtein distance` used between company skill string and resume skill string as an input feature.

### 4.4 Database / Storage
- **No persistent DB integrated** (MongoDB/Postgres not present).
- Uses CSV (`companies.csv`) as static company requirement dataset.
- In-memory global dict (`scores`) stores latest scoring result.
- File-based storage for uploaded PDFs (`uploads/`).

**Alternative architecture recommended:** PostgreSQL + Redis + object storage (S3/GCS).

---

## SECTION 5 — PROJECT ARCHITECTURE

### 5.1 Logical Architecture
User Interface  
↓  
React Frontend (Upload / Company Selection / Analyzer)  
↓  
Flask API (`/upload`, `/get_company_scores`)  
↓  
Resume Parser (`newtext.py` + `textextraction.py`)  
↓  
Feature Engineering + ML Scoring (`predict.py`, `model.joblib`, `companies.csv`)  
↓  
In-memory result cache + frontend visualization

### 5.2 Layer Responsibilities
- **Presentation layer:** all React components and CSS.
- **Application/API layer:** request validation, file handling, response shaping.
- **Extraction layer:** converts unstructured PDF text into structured features.
- **Scoring layer:** computes fit per company using model inference.
- **Visualization layer:** score bar, top-company list, suggestions.

### 5.3 Interaction Notes
- Current system statefulness depends on global `scores`; it is user-session unsafe for multi-user production.
- Frontend currently points directly to hosted backend URL (`onrender.com`) instead of environment-based API base URL.

---

## SECTION 6 — FOLDER STRUCTURE EXPLANATION

### Root folders
- `/src` — React app source code.
- `/public` — static assets and HTML template.
- `/backend_flask/backend_flask` — Python backend and ML scripts.
- `/uploads` — sample and uploaded resume PDFs.
- `/node_modules` — installed frontend dependencies.

### Important frontend files
- `src/index.js` — React bootstrapping.
- `src/App.js` — router definition.
- `src/pages/UploadResume.js` — file upload + status handling.
- `src/pages/CompanyPage.js` — company selection UI.
- `src/pages/AnalyzerPage.js` — score visualization + suggestions.
- `src/styles/*.css` — page-level styling.

### Important backend files
- `app.py` — Flask API endpoints and orchestration.
- `newtext.py` — currently active parser for resume details.
- `predict.py` — model loading and scoring logic.
- `textextraction.py` / `textextraction2.py` — alternate/legacy extraction utilities.
- `companies.csv` — static company requirement dataset.
- `model.joblib` — serialized trained model artifact.

### Miscellaneous
- `tempCodeRunnerFile.py` — likely temporary development copy of backend.
- `error.log` — runtime logs.

---

## SECTION 7 — RESUME PROCESSING PIPELINE

### 7.1 Resume Upload
- Frontend accepts `.pdf` only (`UploadResume.js` checks MIME type).
- Uploaded via `axios.post(.../upload, FormData)`.
- Backend writes file to `uploads/<filename>`.

### 7.2 Text Extraction
- `app.py` calls `textextraction.extract_text_from_pdf(pdf_path)`.
- If extracted text is empty, request fails with 400.

### 7.3 Preprocessing and Field Extraction
In `newtext.py`:
- `extract_cgpa` from patterns around `CGPA|GPA`.
- `extract_marks` using multiple regex forms for SSC/HSC/10th/12th.
- `extract_skills` by matching predefined `SKILL_KEYWORDS` set.

### 7.4 Skill Extraction
- Keyword dictionary-driven (not embedding-based).
- Case-insensitive whole-word regex matching.
- Returns list of detected technical skills.

### 7.5 Resume Analysis and Scoring
In `predict.py`:
- Parse resume numeric features (CGPA, 10th, 12th).
- Convert extracted skills list into comma-separated string.
- For each company row in `companies.csv`:
  - compute Levenshtein distance between company skills and resume skills.
  - form feature vector: `[company_cgpa, company_12th, company_10th, resume_cgpa, resume_12th, resume_10th, similarity]`.
  - run model prediction and multiply by 10 (percentage-like score).

### 7.6 Response Creation
- `/upload` returns full company-score map.
- `/get_company_scores` returns selected company score + top 5 alternatives.

---

## SECTION 8 — FEATURE BREAKDOWN

### 8.1 Resume Upload
- File picker with PDF validation.
- UI state handling: loading, success, and error messages.
- Upload button disabled during invalid/loading state.

### 8.2 Resume Parsing
- Extracts structured profile data from raw PDF text.
- Handles multiple mark labeling formats (SSC/HSC, X/XII, etc.).

### 8.3 Skill Detection
- Uses static keyword list.
- Detects common software/ML stack terms.
- Designed for deterministic extraction (high explainability, low adaptability).

### 8.4 Resume Score
**Computation factors:**
- Academic thresholds from company row.
- Candidate academic values parsed from resume.
- Skill-string similarity proxy.
- Learned relationship in serialized ML model.

### 8.5 Keyword Analysis
- Implicit through similarity distance between company skill requirements and candidate skills.
- No explicit term-frequency heatmap at present.

### 8.6 Suggestions
- Analyzer page renders static improvement tips (not model-generated).
- Suggestions include CGPA threshold, projects, internships, and keyword optimization.

---

## SECTION 9 — DATA FLOW

1. User uploads file from browser.
2. Browser sends multipart request to backend.
3. Backend persists file and extracts text.
4. Parser generates structured resume features.
5. Scoring engine computes company-wise predictions.
6. Backend caches score map globally.
7. User selects company in UI.
8. Backend returns selected + top alternatives.
9. Frontend displays score bar, logo list, and tips.

**Data formats:**
- Upload: multipart/form-data
- Scoring request: JSON `{ company: "<name>" }`
- Responses: JSON with numeric scores

---

## SECTION 10 — AI / NLP ANALYSIS

### 10.1 NLP Techniques Used
- Rule-based extraction using regex.
- Keyword dictionary matching for skills.
- String edit distance (Levenshtein) for skill compatibility proxy.

### 10.2 Feature Extraction
Primary extracted features:
- `CGPA`
- `10th Marks`
- `12th Marks`
- `Skills` (list)

Derived feature:
- `similarity` (edit distance between company skill string and resume skill string).

### 10.3 Skill Detection Method
- Search each skill phrase in text using boundary-aware regex.
- Case-insensitive matching.
- Returns unique skill set.

### 10.4 Scoring Logic
- Model loaded once at module import.
- Company-wise feature vectors generated from static company CSV + resume features.
- `model.predict` output scaled by factor 10.
- Results formatted to 2 decimal places.

### 10.5 Practical Interpretation
The AI here is a **hybrid model**:
- deterministic NLP extraction (rules)
- statistical scoring model (pretrained artifact)

It is not a deep language model pipeline and does not use semantic embeddings.

---

## SECTION 11 — RESULT VISUALIZATION

### 11.1 Presented Outputs
- Selected company match score (animated progress bar)
- Top 5 alternative company matches
- Company logos and mini score badges
- Improvement suggestions list

### 11.2 UI Implementation
- `AnalyzerPage.js` renders all analysis views.
- Material UI components: `Typography`, `CircularProgress`, `Button`, `Tooltip`, `Box`.
- CSS in `AnalyzerPage.css` controls score bar, company cards, and responsive layout.

### 11.3 Visualization Libraries
- No chart library (e.g., Chart.js/Recharts) currently used.
- Visualization is handcrafted with HTML/CSS plus component animation logic (`setInterval` based score animation).

---

## SECTION 12 — SECURITY CONSIDERATIONS

### 12.1 Existing Security Measures
- Basic file presence checks in upload endpoint.
- Frontend MIME check for PDF type.
- Error handling for empty extracted text.

### 12.2 Gaps / Risks
1. **CORS overly permissive** (`origins: *`).
2. **No server-side extension/content-type enforcement beyond input presence.**
3. **No malware scanning of uploaded PDFs.**
4. **Filename directly used when saving** (path collision risk / sanitization concern).
5. **No authentication or tenant isolation.**
6. **Global in-memory scores** can leak cross-user state.
7. **PII handling policy absent** (retention/deletion/encryption not defined).

### 12.3 Recommended Security Hardening
- Restrict CORS to trusted frontend origins.
- Validate MIME + extension + max upload size server-side.
- Use secure filename normalization.
- Add auth and user-bound score storage.
- Encrypt data at rest and in transit.
- Define data retention and GDPR/consent policy.

---

## SECTION 13 — PERFORMANCE OPTIMIZATION

### 13.1 Current Strengths
- Lightweight backend request path.
- Model loaded once at startup.
- CSV-based scoring is straightforward and fast for small datasets.

### 13.2 Current Bottlenecks
- Synchronous PDF parsing and scoring in request thread.
- Re-reading CSV for each scoring call.
- No caching strategy for parsed company matrix.
- Global mutable state unsuitable for scaling.

### 13.3 Suggested Optimizations
- Preload `companies.csv` into memory at startup.
- Use background workers (Celery/RQ) for asynchronous processing.
- Cache resume parse results by file hash.
- Introduce Redis for per-session result caching.
- Add pagination/filtering if company list grows.

---

## SECTION 14 — LIMITATIONS

1. **Skill detection accuracy is limited** to predefined keyword lists.
2. **Resume format dependency:** regex may fail with unconventional templates.
3. **No multilingual processing.**
4. **No OCR path for scanned/image-only PDFs.**
5. **Potential model bias / unknown training assumptions** (`model.joblib` opaque without training notebook).
6. **No explicit ATS rule engine** (headings, section quality, formatting heuristics not deeply scored).
7. **No persistent user history/dashboard.**
8. **No role-specific JD matching input from user.**

---

## SECTION 15 — FUTURE IMPROVEMENTS

1. **LLM-powered resume rewriting suggestions** with section-wise edits.
2. **Job description aware scoring** (candidate resume vs custom JD).
3. **ATS simulation engine** (keyword density, section ordering, readability).
4. **Multilingual resume support** + translation layer.
5. **Recruiter dashboard** with candidate comparisons.
6. **Authentication + profile history** for iterative improvement tracking.
7. **Vector embeddings for semantic skill extraction** (beyond exact keywords).
8. **Confidence scores and explainability panel** for each predicted company fit.
9. **Production-grade storage stack** (Postgres + Redis + object storage).
10. **A/B evaluation pipeline** for model versioning and drift monitoring.

---

## SECTION 16 — INTERVIEW QUESTIONS AND ANSWERS (40+)

### Q1. What problem does Resume Insight solve?
It automates first-pass resume analysis by extracting key profile features and scoring candidate-company fit, reducing manual uncertainty for applicants.

### Q2. Describe the architecture of Resume Insight.
It uses a React SPA for UI, Flask APIs for upload/scoring, regex parsers for feature extraction, and a pre-trained ML model for company fit prediction.

### Q3. What is the role of `UploadResume.js`?
It validates PDF selection, uploads resume to backend, and handles success/error/loading UI state.

### Q4. Which API endpoints exist in backend?
`/upload`, `/get_company_scores`, and a placeholder `/get_results` endpoint.

### Q5. How is text extracted from resumes?
PyMuPDF (`fitz`) reads PDF pages and concatenates extracted text.

### Q6. How are skills extracted?
Regex-based keyword matching against a predefined skill dictionary.

### Q7. How is CGPA extracted?
Regex searches for `CGPA` or `GPA` followed by numeric values.

### Q8. How are 10th and 12th marks extracted?
Multiple regex patterns support variants like SSC/HSC/X/XII and Percentage formats.

### Q9. Which model format is used?
Serialized model via `joblib` (`model.joblib`).

### Q10. What features are fed to the model?
Company criteria (CGPA/12th/10th), candidate values (CGPA/12th/10th), and skill-string distance.

### Q11. Why is Levenshtein distance used?
As a simple numeric proxy for skill text similarity between company requirements and candidate skill set.

### Q12. How are company requirements stored?
As structured rows in `companies.csv`.

### Q13. How are top companies determined?
Backend sorts the score map descending and returns top 5 excluding the selected company.

### Q14. What does the Analyzer page display?
Selected company score bar, alternative company cards with scores, and static improvement tips.

### Q15. Is there a real database?
No. The system uses CSV + in-memory variables + filesystem uploads.

### Q16. Why is global score state risky?
In multi-user environments, one user’s uploaded results can overwrite another’s.

### Q17. What is one immediate production fix?
Associate scores with user session IDs and persist in Redis/database.

### Q18. How would you improve skill extraction quality?
Use NER models, embeddings, taxonomy mapping, and synonym expansion.

### Q19. How would you support scanned resumes?
Add OCR stage (Tesseract or cloud OCR APIs) before text parsing.

### Q20. How can ATS compatibility be enhanced?
Add rule engine for section order, keyword density, measurable impact statements, and formatting checks.

### Q21. Why Flask for backend?
Minimal boilerplate and easy interoperability with Python ML tools.

### Q22. Could FastAPI be better?
Yes for async performance, typed schemas, and auto-generated OpenAPI docs.

### Q23. What frontend routing is used?
React Router (`BrowserRouter`, `Routes`, `Route`).

### Q24. How are logos handled?
Static mapping from company name to Clearbit logo URL in frontend code.

### Q25. What if backend is unreachable?
Frontend catches errors and displays server failure message.

### Q26. Is upload validated server-side strongly?
Not fully; current checks are basic and should be hardened.

### Q27. How does model inference scale currently?
Linearly with number of companies in CSV; suitable for small datasets.

### Q28. Where are API URLs configured?
Hardcoded in frontend pages pointing to Render deployment.

### Q29. What’s a better API URL strategy?
Use environment variable (e.g., `REACT_APP_API_BASE_URL`).

### Q30. Are there tests in repo?
No dedicated unit/integration tests are implemented for core features.

### Q31. What is a key data privacy concern?
Uploaded resumes contain PII but retention/deletion policy is not formalized.

### Q32. How would you secure file uploads?
Size caps, extension+MIME checks, safe filename generation, antivirus scan, private storage.

### Q33. How would you support recruiter workflows?
Build dashboard for candidate ranking, filtering, and model explanation view.

### Q34. How to avoid blocking request during parsing?
Move parsing/scoring to async worker queue.

### Q35. How to version ML models safely?
Store model metadata, maintain rollback strategy, and track inference metrics.

### Q36. What are limitations of regex extraction?
It fails on formatting diversity and cannot infer semantics like contextual skill depth.

### Q37. How does the score animation work?
A timer increments displayed score (`setInterval`) until target value.

### Q38. What deployment model does code suggest?
Frontend static hosting + backend hosted Flask API (Render-style URL indicates cloud deployment).

### Q39. How would you monitor production health?
Add API metrics, tracing, centralized logs, and error alerting.

### Q40. How would you scale to millions of users?
Stateless API pods, queue-based processing, distributed cache, autoscaling workers, object storage, CDN, and sharded analytics.

### Q41. How can explainability be improved?
Return feature contribution estimates (e.g., SHAP-like explanations) per score.

### Q42. What is a quick UX improvement?
Show parsed resume fields and detected skills to build user trust before score display.

---

## SECTION 17 — DEPLOYMENT GUIDE

> Note: Repository currently lacks a dedicated backend `requirements.txt`; dependencies are inferred from imports.

### 17.1 Prerequisites
- Node.js + npm (frontend)
- Python 3.10+ (backend)
- pip

### 17.2 Frontend Setup
```bash
cd /workspace/Resume-Insight
npm install
npm start
```
Frontend default URL: `http://localhost:3000`

### 17.3 Backend Setup (Flask)
```bash
cd /workspace/Resume-Insight/backend_flask/backend_flask
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install flask flask-cors pymupdf spacy joblib pandas numpy python-Levenshtein
python -m spacy download en_core_web_sm
python app.py
```
Backend URL: `http://localhost:5000`

### 17.4 Frontend-Backend Integration
Current frontend points to hosted URL. For local development:
- Replace hardcoded API URLs in `UploadResume.js` and `AnalyzerPage.js`.
- Recommended: centralize API base in environment variables.

### 17.5 Production Deployment Recommendations
- Frontend: Vercel/Netlify/static bucket.
- Backend: Render/Fly.io/AWS ECS.
- Storage: S3 + DB + Redis.
- Security: HTTPS, CORS restrictions, auth, file scanning.

---

## SECTION 18 — PROJECT SUMMARY (2-MINUTE INTERVIEW VERSION)

Resume Insight is a full-stack AI-enabled resume evaluation platform. The frontend is built in React with a three-stage flow: resume upload, company selection, and analysis view. On upload, a Flask backend extracts text from PDF resumes using PyMuPDF, parses candidate attributes like CGPA, academic marks, and technical skills through regex-based NLP, and then runs a trained ML model to estimate company-wise fit scores using both profile features and skill similarity. Results are returned as a selected company match percentage plus top alternative matches, and displayed with visual score indicators and actionable tips.

From an engineering perspective, it demonstrates integration of UI, API design, document parsing, NLP feature extraction, and ML inference in a single pipeline. It is a strong foundation for scaling into an enterprise-grade ATS assistant by adding secure storage, user sessions, richer NLP (LLM/embeddings), role-specific job-description matching, and recruiter analytics dashboards.

---

## Appendix A — Key File Map
- Frontend entry: `src/index.js`
- Routing: `src/App.js`
- Upload page: `src/pages/UploadResume.js`
- Company selector: `src/pages/CompanyPage.js`
- Analyzer UI: `src/pages/AnalyzerPage.js`
- API server: `backend_flask/backend_flask/app.py`
- Parser: `backend_flask/backend_flask/newtext.py`
- Scoring engine: `backend_flask/backend_flask/predict.py`
- Dataset: `backend_flask/backend_flask/companies.csv`
- Model artifact: `backend_flask/backend_flask/model.joblib`

## Appendix B — Notable Observations
1. `axios` is imported in frontend but not listed in `package.json` dependencies.
2. `textextraction2.py` and `tempCodeRunnerFile.py` appear to be alternate/development artifacts.
3. `spacy` is imported in extraction modules but not actively used in current extraction flow.
4. Current backend design is functional for demos but needs session-safe architecture for production.

