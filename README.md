With a capstone project coming up I decided to get a head start on the tech stack
# 📊 Data Dashboard with Flask + Docker

This is a full-stack dashboard built with Flask, Chart.js, and Python that:

✅ Displays data from JSON  
✅ Filters it dynamically  
✅ Generates Excel reports with one click  
✅ Is fully Dockerized and self-contained

## 🚀 Features
- Flask backend with `/generate-report`
- Dynamic frontend table & chart
- Excel report generation using pandas & openpyxl
- Works locally or in Docker

## 🐳 Run in Docker

```bash
docker build -t flask-dashboard .
docker run -p 5050:5000 flask-dashboard
