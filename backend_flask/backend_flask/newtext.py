import fitz  # PyMuPDF
import re
import predict as t
# Keywords for extraction
SKILL_KEYWORDS = {
    "Python", "Java", "JavaScript", "React", "SQL", "C++", "Flask",
    "Django", "Machine Learning", "Data Science", "Node.js", "AWS",
    "MongoDB", "Express", "TensorFlow", "Keras", "HTML", "CSS"
}

def extract_text_from_pdf(pdf_path):
    """Extracts text from a given PDF file."""
    try:
        with fitz.open(pdf_path) as doc:
            text = "\n".join(page.get_text("text") for page in doc)
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def extract_cgpa(text):
    """Extract CGPA from resume text."""
    match = re.search(r"(?:CGPA|GPA)[:\s-]*([\d.]+)", text, re.IGNORECASE)
    return round(float(match.group(1)), 2) if match else None  # None if not found

def extract_marks(text):
    """Extracts 10th (SSC) and 12th (HSC) marks from resume text, handling different formats."""
    
    patterns_10 = [
        r"SSC\s*(?:Percentage)?\s*[:\-]?\s*(\d{1,3}(?:\.\d+)?)\s*%?", 
        r"10th\s*(?:Percentage)?\s*[:\-]?\s*(\d{1,3}(?:\.\d+)?)\s*%?", 
        r"\bX\s*(?:Percentage)?\s*[:\-]?\s*(\d{1,3}(?:\.\d+)?)\s*%?",
        r"\bSecondary\s*(?:Percentage)?\s*[:\-]?\s*(\d{1,3}(?:\.\d+)?)\s*%?"
    ]

    patterns_12 = [
        r"HSC\s*(?:Percentage)?\s*[:\-]?\s*(\d{1,3}(?:\.\d+)?)\s*%?", 
        r"12th\s*(?:Percentage)?\s*[:\-]?\s*(\d{1,3}(?:\.\d+)?)\s*%?", 
        r"\bXII\s*(?:Percentage)?\s*[:\-]?\s*(\d{1,3}(?:\.\d+)?)\s*%?",
        r"\bHigher\s*Secondary\s*(?:Percentage)?\s*[:\-]?\s*(\d{1,3}(?:\.\d+)?)\s*%?"
    ]

    marks_10, marks_12 = None, None  # Initialize as None

    # Search for 10th marks
    for pattern in patterns_10:
        match_10 = re.search(pattern, text, re.IGNORECASE)
        if match_10:
            marks_10 = float(match_10.group(1))
            break  # Stop at first match

    # Search for 12th marks
    for pattern in patterns_12:
        match_12 = re.search(pattern, text, re.IGNORECASE)
        if match_12:
            marks_12 = float(match_12.group(1))
            break  # Stop at first match

    return marks_10, marks_12  # Return as separate values

def extract_skills(text):
    """Extract skills from resume text."""
    detected_skills = {skill for skill in SKILL_KEYWORDS if re.search(fr"\b{re.escape(skill)}\b", text, re.IGNORECASE)}
    return list(detected_skills) if detected_skills else None  # Return None if no skills found

def extract_resume_details(pdf_path):
    """Extracts CGPA, 10th & 12th marks, and skills from a resume PDF and returns them in a dictionary."""
    text = extract_text_from_pdf(pdf_path)
    marks_10, marks_12 = extract_marks(text)  # Extract marks separately

    return {
        "CGPA": extract_cgpa(text),
        "10th Marks": marks_10,
        "12th Marks": marks_12,
        "Skills": extract_skills(text)
    }

# Example Usage
if __name__ == "__main__":
    pdf_file = "uploads/Gitesh_Dalal_E2K221287_Resume.pdf"  # Change this to your file path
    resume_data = extract_resume_details(pdf_file)

    print("Extracted Resume Data:\n", resume_data)  # Display structured output

    print(t.score(resume_data))


