from flask import Flask, render_template
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

@app.route("/")
def dashboard():
    return render_template("index.html")  # will look for templates/index.html

@app.route("/generate-report", methods=["POST"])
def generate_report():
    try:
        subprocess.run(["python3", "generate_report.py"], check=True)
        return "✅ Report generated successfully!"
    except Exception as e:
        print("Error:", e)
        return f"❌ Failed to generate report: {e}", 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
