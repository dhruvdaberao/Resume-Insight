# from flask import Flask, request, jsonify
# import fitz  # PyMuPDF
# from difflib import get_close_matches as gcm
# from flask_cors import CORS
# import os
# import spacy
# import re
# import textextraction as tx
# import newtext as nt
# import predict as p

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# #uploading endpoint*********************************************

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         print("No file found in request")
#         return jsonify({"error": "No file uploaded"}), 400

#     pdf_file = request.files['file']
#     print(f"Received file: {pdf_file.filename}")

#     pdf_path = os.path.join(UPLOAD_FOLDER, pdf_file.filename)
#     pdf_file.save(pdf_path)

#     extracted_text = tx.extract_text_from_pdf(pdf_path)
#     print(extracted_text)

#     if not extracted_text.strip():
#         return jsonify({"error": "No text extracted"}), 400

#     resume_data = nt.extract_resume_details(pdf_path)
    

#     return jsonify({"success": True, "data": p.score(resume_data)})



# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)








# from flask import Flask, request, jsonify
# import os
# import joblib
# import textextraction as tx
# import newtext as nt
# import predict as p
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# MODEL_PATH = "model.joblib"

# def load_model():
#     if not os.path.exists(MODEL_PATH):
#         print(f"❌ Model file '{MODEL_PATH}' not found!")
#         return None
#     try:
#         return joblib.load(MODEL_PATH)
#     except Exception as e:
#         print(f"❌ Error loading model: {e}")
#         return None

# model = load_model()

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     print("📥 Received upload request")

#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     pdf_file = request.files['file']
#     if pdf_file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     pdf_path = os.path.join(UPLOAD_FOLDER, pdf_file.filename)
#     pdf_file.save(pdf_path)
#     print(f"✅ File saved at: {pdf_path}")

#     # Extract text
#     extracted_text = tx.extract_text_from_pdf(pdf_path)
#     if not extracted_text.strip():
#         return jsonify({"error": "No text extracted"}), 400

#     # Process resume
#     try:
#         resume_data = nt.extract_resume_details(pdf_path)
#         # if not model:
#         #     return jsonify({"error": "Model file missing"}), 500

#         score = p.score(resume_data)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     return jsonify({"success": True, "data": score})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)





# from flask import Flask, request, jsonify
# import os
# import joblib
# import textextraction as tx
# import newtext as nt
# import predict as p
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# MODEL_PATH = "model.joblib"

# def load_model():
#     if not os.path.exists(MODEL_PATH):
#         print(f"❌ Model file '{MODEL_PATH}' not found!")
#         return None
#     try:
#         return joblib.load(MODEL_PATH)
#     except Exception as e:
#         print(f"❌ Error loading model: {e}")
#         return None

# model = load_model()

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     print("📥 Received upload request")

#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     pdf_file = request.files['file']
#     if pdf_file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     pdf_path = os.path.join(UPLOAD_FOLDER, pdf_file.filename)
#     pdf_file.save(pdf_path)
#     print(f"✅ File saved at: {pdf_path}")

#     # Extract text
#     extracted_text = tx.extract_text_from_pdf(pdf_path)
#     if not extracted_text.strip():
#         return jsonify({"error": "No text extracted"}), 400

#     # Process resume
#     try:
#         resume_data = nt.extract_resume_details(pdf_path)
#         scores = p.score(resume_data)  # Dictionary of company scores
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     return jsonify({"success": True, "data": scores})

# @app.route('/get_company_scores', methods=['POST'])
# def get_company_scores():
#     data = request.get_json()
#     selected_company = data.get("company")

#     if not selected_company:
#         return jsonify({"error": "No company selected"}), 400

#     # Assuming scores is a dictionary { 'Google': 85, 'Microsoft': 78, ... }
#     scores = p.get_all_scores()  # Function that retrieves scores for all companies
    
#     if selected_company not in scores:
#         return jsonify({"error": "Selected company not found in scores"}), 404

#     selected_score = scores[selected_company]
    
#     # Get top 5 companies excluding the selected company
#     sorted_companies = sorted(scores.items(), key=lambda x: x[1], reverse=True)
#     top_companies = [comp for comp in sorted_companies if comp[0] != selected_company][:5]
    
#     response = {
#         "selected_company": selected_company,
#         "selected_score": selected_score,
#         "top_companies": top_companies
#     }

#     return jsonify(response)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)



# from flask import Flask, request, jsonify
# import os
# import joblib
# import textextraction as tx
# import newtext as nt
# import predict as p
# import requests
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# MODEL_PATH = "model.joblib"

# def load_model():
#     if not os.path.exists(MODEL_PATH):
#         print(f"❌ Model file '{MODEL_PATH}' not found!")
#         return None
#     try:
#         return joblib.load(MODEL_PATH)
#     except Exception as e:
#         print(f"❌ Error loading model: {e}")
#         return None

# model = load_model()

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     print("📥 Received upload request")

#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     pdf_file = request.files['file']
#     if pdf_file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     pdf_path = os.path.join(UPLOAD_FOLDER, pdf_file.filename)
#     pdf_file.save(pdf_path)
#     print(f"✅ File saved at: {pdf_path}")

#     # Extract text
#     extracted_text = tx.extract_text_from_pdf(pdf_path)
#     if not extracted_text.strip():
#         return jsonify({"error": "No text extracted"}), 400

#     # Process resume
#     try:
#         resume_data = nt.extract_resume_details(pdf_path)
#         scores = p.score(resume_data)  # Dictionary of company scores
#         # print("Score:", scores)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     return jsonify({"success": True, "data": scores})

# @app.route('/get_company_scores', methods=['POST'])
# def get_company_scores():
#     data = request.get_json()
#     print(data)
#     selected_company = data.get("company")

#     if not selected_company:
#         return jsonify({"error": "No company selected"}), 400

#     # Assuming scores is a dictionary { 'Google': 85, 'Microsoft': 78, ... }
#     scores = p.get_all_scores()  # Function that retrieves scores for all companies
    
#     if selected_company not in scores:
#         return jsonify({"error": "Selected company not found in scores"}), 404

#     selected_score = scores[selected_company]
    
#     # Get top 5 companies excluding the selected company
#     sorted_companies = sorted(scores.items(), key=lambda x: x[1], reverse=True)
#     top_companies = [comp for comp in sorted_companies if comp[0] != selected_company][:5]
    
#     response = {
#         "selected_company": selected_company,
#         "selected_score": selected_score,
#         "top_companies": top_companies
#     }

#     return jsonify(response)

# @app.route('/get_results', methods=['GET'])
# def get_results():
#     return jsonify({"message": "This is a placeholder response for /get_results"})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)

from flask import Flask, request, jsonify
import os
import joblib
import textextraction as tx
import newtext as nt
import predict as p
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MODEL_PATH = "model.joblib"
scores = {}  # Global variable to store scores

def load_model():
    if not os.path.exists(MODEL_PATH):
        print(f"❌ Model file '{MODEL_PATH}' not found!")
        return None
    try:
        return joblib.load(MODEL_PATH)
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return None

model = load_model()

@app.route('/upload', methods=['POST'])
def upload_file():
    global scores  # Access the global variable
    print("📥 Received upload request")

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    pdf_file = request.files['file']
    if pdf_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    pdf_path = os.path.join(UPLOAD_FOLDER, pdf_file.filename)
    pdf_file.save(pdf_path)
    print(f"✅ File saved at: {pdf_path}")

    # Extract text
    extracted_text = tx.extract_text_from_pdf(pdf_path)
    if not extracted_text.strip():
        return jsonify({"error": "No text extracted"}), 400

    # Process resume
    try:
        resume_data = nt.extract_resume_details(pdf_path)
        scores = p.score(resume_data)  # Store scores globally
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"success": True, "data": scores})

@app.route('/get_company_scores', methods=['POST'])
def get_company_scores():
    global scores  # Access the stored scores

    if not scores:
        return jsonify({"error": "No resume data available. Please upload a resume first."}), 400

    data = request.get_json()
    selected_company = data.get("company")

    if not selected_company:
        return jsonify({"error": "No company selected"}), 400

    if selected_company not in scores:
        return jsonify({"error": "Selected company not found in scores"}), 404

    selected_score = scores[selected_company]
    
    # Get top 5 companies excluding the selected one
    sorted_companies = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    top_companies = [comp for comp in sorted_companies if comp[0] != selected_company][:5]
    
    response = {
        "selected_company": selected_company,
        "selected_score": selected_score,
        "top_companies": top_companies
    }

    return jsonify(response)

@app.route('/get_results', methods=['GET'])
def get_results():
    return jsonify({"message": "This is a placeholder response for /get_results"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
