# import joblib
# import pandas as pd

# from Levenshtein import distance
# import numpy as np

# def score(resume):
#     model = joblib.load("model.joblib")

#     def compute_similarity(str1, str2):
#         return distance(str1, str2)


#     df = pd.read_csv("companies.csv")

#     resume_cgpa = resume["CGPA"]
#     resume_12th = resume["12th Marks"]
#     resume_10th = resume["10th Marks"]
#     resume_skills = ", ".join(resume["Skills"]) if resume["Skills"] else ""

#     results = {}

#     for _, row in df.iterrows():
#         company_name = row["Company Name"]
#         company_cgpa = row["CGPA"]
#         company_12th = row["12th"]
#         company_10th = row["10th"]
#         company_skills = row["Skills"]

#         similarity = compute_similarity(company_skills, resume_skills)

#         results[company_name] = float(f"{model.predict(np.array([[company_cgpa, company_12th, company_10th, resume_cgpa, resume_12th, resume_10th, similarity]]))[0] * 10}")

#     return results


# import joblib
# import pandas as pd
# import os
# from Levenshtein import distance
# import numpy as np

# # Load the model with the correct absolute path
# model_path = os.path.join(os.path.dirname(__file__), "model.joblib")
# model = joblib.load(model_path)

# # Load the companies dataset
# csv_path = os.path.join(os.path.dirname(__file__), "companies.csv")

# def compute_similarity(str1, str2):
#     return distance(str1, str2)

# def score(resume):
#     df = pd.read_csv(csv_path)

#     resume_cgpa = resume.get("CGPA", 0)
#     resume_12th = resume.get("12th Marks", 0)
#     resume_10th = resume.get("10th Marks", 0)
#     resume_skills = ", ".join(resume.get("Skills", []))  # Handle missing Skills field

#     results = {}

#     for _, row in df.iterrows():
#         company_name = row["Company Name"]
#         company_cgpa = row["CGPA"]
#         company_12th = row["12th"]
#         company_10th = row["10th"]
#         company_skills = row["Skills"]

#         similarity = compute_similarity(company_skills, resume_skills)

#         # Ensure data is in the correct format
#         input_features = np.array([[company_cgpa, company_12th, company_10th, 
#                                     resume_cgpa, resume_12th, resume_10th, similarity]])

#         prediction = model.predict(input_features)[0] * 10
#         results[company_name] = float(f"{prediction:.2f}")  # Ensure float format

#     return results



import joblib
import pandas as pd
import os
from Levenshtein import distance
import numpy as np
import warnings
warnings.simplefilter("ignore", category=UserWarning)



# Load the model with the correct absolute path
model_path = os.path.join(os.path.dirname(__file__), "model.joblib")
print(model_path)
model = joblib.load(model_path)

# Load the companies dataset
csv_path = os.path.join(os.path.dirname(__file__), "companies.csv")

def compute_similarity(str1, str2):
    return distance(str1, str2)

def score(resume):
    df = pd.read_csv(csv_path)

    resume_cgpa = resume.get("CGPA", 0)
    resume_12th = resume.get("12th Marks", 0)
    resume_10th = resume.get("10th Marks", 0)
    resume_skills = ", ".join(resume.get("Skills", []))  # Handle missing Skills field

    results = {}

    for _, row in df.iterrows():
        company_name = row["Company Name"]
        company_cgpa = row["CGPA"]
        company_12th = row["12th"]
        company_10th = row["10th"]
        company_skills = row["Skills"]

        similarity = compute_similarity(company_skills, resume_skills)

        # Ensure data is in the correct format
        input_features = np.array([[company_cgpa, company_12th, company_10th, 
                                    resume_cgpa, resume_12th, resume_10th, similarity]])

        prediction = model.predict(input_features)[0] * 10
        results[company_name] = float(f"{prediction:.2f}")  # Ensure float format

    return results  

# ✅ Fix: Define `get_all_scores` function
def get_all_scores():
    df = pd.read_csv(csv_path)
    results = {}

    for _, row in df.iterrows():
        company_name = row["Company Name"]
        company_cgpa = row["CGPA"]
        company_12th = row["12th"]
        company_10th = row["10th"]
        
        # Default values if resume data is not provided
        resume_cgpa = company_cgpa
        resume_12th = company_12th
        resume_10th = company_10th
        similarity = 1  # Assume perfect similarity for generic scoring
        
        
        input_features = np.array([[company_cgpa, company_12th, company_10th, 
                                    resume_cgpa, resume_12th, resume_10th, similarity]])
       

        prediction = model.predict(input_features)[0] * 10
        results[company_name] = float(f"{prediction:.2f}")  # Ensure float format
        # print(str(company_name) + " :" + str(results[company_name]))

    return results  
