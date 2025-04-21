from flask import Flask, request, jsonify
import fitz  # PyMuPDF
from difflib import get_close_matches as gcm
from flask_cors import CORS
import os
import spacy
import re


nlp_obj= spacy.load("en_core_web_sm")

SKILLS = ["Python", "Java", "JavaScript", "React", "SQL", "C++", "Flask"]

#*****************************extraction*************************************

def extract_text_from_pdf(pdf_path):
    text = ""
    doc = fitz.open(pdf_path)
    for page in doc:
        text += page.get_text()
    return text


# def extract_skills(text):
#     detected_skills = []
#     for skill in SKILLS:
#         matches = gcm(skill, text.split(), n=1, cutoff=0.8)
#         if matches:
#             detected_skills.append(skill)
#     return list(set(detected_skills))

def extract_skills(text):
    tech_keywords = [
    "Python", "Django", "React", "SQL", "Git", "Machine Learning", "Data Analysis",
    "Java", "Spring Boot", "Angular", "PostgreSQL", "AWS", "REST APIs", "Microservices",
    "C++", "Qt", "OpenGL", "Embedded Systems", "Linux", "RTOS",
    "JavaScript", "Node.js", "Express.js", "MongoDB", "HTML", "CSS", "UI/UX Design",
    "C#", ".NET", "ASP.NET", "Entity Framework", "Azure", "DevOps", "CI/CD",
    "Python", "Flask", "Vue.js", "MySQL", "NLP", "Deep Learning",
    "Go", "gRPC", "Kubernetes", "Docker", "Distributed Systems", "Cloud Computing",
    "PHP", "Laravel", "React Native", "SQLite", "Mobile App Development", "Agile",
    "R", "Tableau", "Power BI", "Statistical Analysis", "Data Visualization", "Business Intelligence",
    "Swift", "SwiftUI", "iOS Development", "Firebase", "Objective-C", "Cocoa Touch"
    ]

    detected_skills = set()
    
    detected_skills = set()
    
    for skill in tech_keywords:
        skill_pattern = rf"\b{re.escape(skill)}\b"  # Escape special characters in skill names
        if re.search(skill_pattern, text, re.IGNORECASE):
            detected_skills.add(skill)
    
    return list(detected_skills)


def extract_education(text):
    education_patterns = [
        r"\b(10th|12th|High School|Senior Secondary|SSC|HSC|Diploma|Bachelor|B\.Tech|BSc|M\.Tech|MBA|PhD)\b",
        r"\b(CGPA|GPA|Percentage)\s*[:\-]?\s*(\d+(\.\d+)?)\b"  # Captures CGPA or Percentage
    ]
    
    education = []
    marks = []

    for pattern in education_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        
        for match in matches:
            if isinstance(match, tuple):  # Extract relevant parts
                if match[0] in ["CGPA", "GPA", "Percentage"]:
                    marks.append(f"{match[0]}: {match[1]}%")
                else:
                    education.append(match[0])
            else:
                education.append(match)

    return f"{', '.join(education) if education else 'None'}, {', '.join(marks) if marks else 'None'}"

# def extract_education(text):
#     education_patterns = [
#         r"\b(10th|12th|High School|Senior Secondary|SSC|HSC|Diploma|Bachelor|B\.Tech|BSc|M\.Tech|MBA|PhD)\b",
#         r"\b(CGPA|GPA|Percentage)\s*[:\-]?\s*(\d+(\.\d+)?)\b"  # Captures CGPA or Percentage
#     ]
    
#     education = []
#     marks = {}

#     for pattern in education_patterns:
#         matches = re.findall(pattern, text, re.IGNORECASE)
        
#         for match in matches:
#             if isinstance(match, tuple):  
#                 if match[0] in ["CGPA", "GPA", "Percentage"]:
#                     marks["CGPA"] = match[1]  # Store CGPA as key-value pair
#                 else:
#                     education.append(match[0])
#             else:
#                 education.append(match)

#     return {
#         "10th": "Yes" if "10th" in education else "No",
#         "12th": "Yes" if "12th" in education else "No",
#         "CGPA": marks.get("CGPA", "N/A")  # Return CGPA if found, otherwise "N/A"
#     }

def extract_education(text):
    education = {"10th": "No", "12th": "No", "CGPA": "N/A"}
    
    if re.search(r"SSC Percentage\s*:\s*\d+%", text):
        education["10th"] = "Yes"
    if re.search(r"HSC Percentage\s*:\s*\d+%", text):
        education["12th"] = "Yes"
    
    cgpa_match = re.search(r"SGPA\s*:\s*([\d.]+)", text)
    if cgpa_match:
        education["CGPA"] = cgpa_match.group(1)  # Extract actual CGPA value

    return education


# def extract_projects(text):
#     project_patterns = [
#         r"\b(?:Projects|Project|Description)\s*[:\-]?\s*(.*?)(?=\n[A-Z]|\Z)",  # Captures project titles
#         r"(?:Technologies used|Frameworks used)\s*[:\-]?\s*(.*?)(?=\n[A-Z]|\Z)"  # Captures technologies
#     ]

#     projects = []
    
#     for pattern in project_patterns:
#         matches = re.findall(pattern, text, re.IGNORECASE)
#         projects.extend([match.strip() for match in matches if match.strip()])

#     return ', '.join(projects) if projects else "None"

def extract_projects(text):
    project_patterns = [
        r"(?:Projects|Project|Description)\s*[:\-]?\s*(.*?)(?=\n[A-Z]|\Z)",
        r"(?:Technologies used|Frameworks used)\s*[:\-]?\s*(.*?)(?=\n[A-Z]|\Z)"
    ]
    
    projects = set()
    
    for pattern in project_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            projects.update(match.strip().split(','))
    
    return list(projects)



def extract_work_experience(text):
    work_patterns = [
        r"(?:Work Experience|Experience|Employment)\s*[:\-]?\s*(.*?)(?=\n[A-Z]|\Z)"
    ]

    work_experiences = []
    
    for pattern in work_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE | re.DOTALL)
        for match in matches:
            # Ensure we only take "Internship" when inside the Experience section
            if "Internship" in match or "Intern" in match:
                work_experiences.append(match.strip())

    return ', '.join(work_experiences) if work_experiences else "None"







