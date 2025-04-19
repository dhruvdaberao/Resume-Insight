import fitz  # PyMuPDF
import re
import spacy

nlp_obj = spacy.load("en_core_web_sm")

SKILLS = [
    "Python", "Java", "JavaScript", "React", "SQL", "C++", "Flask", "Django",
    "Machine Learning", "Data Analysis", "Spring Boot", "PostgreSQL", "AWS",
    "REST APIs", "Microservices", "Embedded Systems", "Linux", "RTOS", 
    "Node.js", "MongoDB", "HTML", "CSS", "UI/UX Design", "DevOps", "CI/CD",
    "Kubernetes", "Docker", "Cloud Computing", "Mobile App Development",
    "Statistical Analysis", "Data Visualization"
]

#***************************** Extraction Functions *****************************

def extract_text_from_pdf(pdf_path):
    """Extract text from a given PDF file."""
    text = ""
    doc = fitz.open(pdf_path)
    for page in doc:
        text += page.get_text()
    return text

def extract_skills(text):
    """Extracts programming and technical skills from resume text."""
    detected_skills = set()
    
    for skill in SKILLS:
        skill_pattern = rf"\b{re.escape(skill)}\b"
        if re.search(skill_pattern, text, re.IGNORECASE):
            detected_skills.add(skill)
    
    return list(detected_skills)

def extract_education(text):
    education = {"10th": 0.0, "12th": 0.0, "CGPA": 0.0}

    tenth_match = re.search(r"10th\s*Percentage\s*[:\-]?\s*([\d.]+)", text)
    twelfth_match = re.search(r"12th\s*Percentage\s*[:\-]?\s*([\d.]+)", text)
    cgpa_match = re.search(r"SGPA\s*[:\-]?\s*([\d.]+)", text)

    if tenth_match:
        education["10th"] = float(tenth_match.group(1))
    if twelfth_match:
        education["12th"] = float(twelfth_match.group(1))
    if cgpa_match:
        education["CGPA"] = float(cgpa_match.group(1))

    return education



def extract_projects(text):
    """Extracts project titles and associated technologies."""
    projects = []
    
    project_blocks = re.findall(
        r"(?:Projects|Project|Description)\s*[:\-]?\s*(.*?)(?=\n[A-Z]|\Z)", 
        text, re.IGNORECASE | re.DOTALL
    )
    
    tech_blocks = re.findall(
        r"(?:Technologies used|Frameworks used)\s*[:\-]?\s*(.*?)(?=\n[A-Z]|\Z)", 
        text, re.IGNORECASE | re.DOTALL
    )

    for project, tech in zip(project_blocks, tech_blocks):
        projects.append({
            "title": project.strip(),
            "technologies": tech.strip().split(", ")
        })

    return projects if projects else "None"

def extract_work_experience(text):
    """Extracts work experience or internships."""
    work_experiences = []

    matches = re.findall(
        r"(?:Work Experience|Experience|Employment|Internship)\s*[:\-]?\s*(.*?)(?=\n[A-Z]|\Z)",
        text, re.IGNORECASE | re.DOTALL
    )

    for match in matches:
        work_experiences.append(match.strip())

    return work_experiences if work_experiences else "None"
