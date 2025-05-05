
from flask import Flask, request, jsonify
import os
import joblib
import textextraction as tx
import newtext as nt
import predict as p
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

MODEL_PATH = "model.joblib"

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
        # if not model:
        #     return jsonify({"error": "Model file missing"}), 500

        score = p.score(resume_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"success": True, "data": score})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
