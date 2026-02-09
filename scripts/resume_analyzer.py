import os
import sys
import re
import json
import PyPDF2

# Pre-normalize keywords for faster lookup
SKILL_KEYWORDS = [
    "Python", "Java", "C++", "TensorFlow", "PyTorch", "GraphQL",
    "Scikit-learn", "Machine Learning", "Deep Learning", "Data Science", 
    "Big Data", "Cloud Computing", "Azure", "MySQL", "MATLAB", "Hadoop",
    "Big-Data", "Data Analytics", "Data Analyst", "Predictive Modeling",
    "Keras", "Statistical Modeling", "Statistical Analysis", 
    "Django", "Flask", "JavaScript", "TypeScript", "React", "Node.js", 
    "Angular", "Vue.js", "Ruby", "C#", "Swift", "Scala", "Kotlin", 
    "Rust", "Golang", "Insomnia", "Postman", "Shell Scripting", "Bash",
    "Spark", "Kafka", "MongoDB", "PostgreSQL", "Redis", "NoSQL",  
    "Docker", "Kubernetes", "CI/CD", "GitHub", "GitLab", "Jenkins", 
    "Terraform", "Ansible", "Puppet", "Selenium", "Network Security",
    "DevOps", "Agile", "Scrum", "Test Automation", "Unit Testing",  
    "Pandas", "NumPy", "Matplotlib", "Seaborn", "OpenCV", "Computer Vision", 
    "Reinforcement Learning", "Data Engineering", "Data Warehousing", 
    "Tableau", "Power BI", "Business Intelligence", "Data Pipeline",
    "Graph Databases", "Elasticsearch", "Quantum Computing", "JIRA",
    "Blockchain", "Cryptocurrency", "Smart Contracts", "Microservice", 
    "API Development", "OAuth", "Web Services", "RESTful APIs", 
    "Web Scraping", "Web Development", "Mobile Development", "Android", 
    "Flutter", "Xamarin", "Networking", "Cybersecurity", "Large Language Model",
    "Penetration Testing", "Intrusion Detection", "Cloud Security", "DevSecOps",
    "Alteryx", "Data Mining", "Data Visualization", "Data Visualisation",
    "Microsoft Office", "Powerpoint", ".NET", "Dotnet", "MXNet", "Apache",
    "Feature Engineering", "Data Exploration", "Prescriptive Analytics",
    "Predictive Analytics", "Predictive Models Analysis", "Forecast",
    "Quantitative analysis", "Assembly", "Perl", "Qlik Sense",
    "Snowflake", "Neural Network", "GANs", "LangChain", "MLflow", "Hugging Face",
    "AutoML", "XGBoost", "LightGBM", "CatBoost", "Grafana",
    "Burp Suite", "Kali Linux", "Nmap", "Wireshark", "Packet Tracer", "Splunk",
    "Metasploit", "Prometheus", "TestNG", "JUnit", "Cypress",
    "React Native", "SwiftUI", "Ionic"
]

SINGLE_DIGIT_SKILLS = [
    "AI", "R", "C", "AWS", "LLM", "GO", "NLP", "ETL",
    "GCP", "HTML", "CSS", "PHP", "SQL", "ELK", "JWT",
    "SPSS", "SOAP", "JAX", "IAM", "Go", "Aws", "Visio", "Excel", "Vuex"
]

def extract_text(filepath):
    text = ""
    if not os.path.exists(filepath):
        return ""
    if filepath.lower().endswith(".pdf"):
        try:
            with open(filepath, "rb") as pdf_file:
                reader = PyPDF2.PdfReader(pdf_file)
                for page in reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception:
            pass
    elif filepath.lower().endswith(".docx"):
        try:
            import mammoth
            with open(filepath, "rb") as docx_file:
                result = mammoth.extract_raw_text(docx_file)
                text = result.value if result else ""
        except Exception:
            pass
    return text.strip()

def normalize(s):
    return re.sub(r'[^a-zA-Z0-9]', '', s).lower()

def extract_skills(text):
    text_norm = normalize(text)
    found = set()
    
    # Fast scan for multi-word skills
    for skill in SKILL_KEYWORDS:
        if normalize(skill) in text_norm:
            found.add(skill)
            
    # Regex scan for exact word matches (critical for 'C', 'R', 'AWS')
    pattern = r'\b(' + '|'.join(map(re.escape, SINGLE_DIGIT_SKILLS)) + r')\b'
    matches = re.findall(pattern, text, re.IGNORECASE)
    for m in matches:
        found.add(m.upper())
        
    return list(found)

def main():
    try:
        if len(sys.argv) < 2:
            print(json.dumps({"error": "No file path provided"}))
            return

        filepath = sys.argv[1]
        job_desc = sys.argv[2] if len(sys.argv) > 2 else "Software Engineer React Node.js Python AWS Docker Kubernetes CI/CD"

        resume_text = extract_text(filepath)
        if not resume_text:
            # Fallback for empty/unreadable files to prevent crash
            resume_text = "Empty Resume"

        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity

        vectorizer = TfidfVectorizer()
        vectors = vectorizer.fit_transform([resume_text, job_desc])
        score = round(float(cosine_similarity(vectors)[0, 1]) * 100, 2)
        
        job_skills = extract_skills(job_desc)
        resume_skills = extract_skills(resume_text)
        
        matched = list(set(resume_skills) & set(job_skills))
        missing = list(set(job_skills) - set(resume_skills))
        
        email_match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}", resume_text)
        phone_match = re.search(r"(?:\+\d{1,3}\s?)?(?:\(?\d{2,4}\)?[\s.-]*)(\d{2,4})[\s.-]*(\d{2,4})[\s.-]*(\d{2,4})", resume_text)

        results = {
            "score": score,
            "matched": matched,
            "missing": missing,
            "email": email_match.group(0) if email_match else "Not found",
            "phone": phone_match.group(0) if phone_match else "Not found"
        }
        print(json.dumps(results))
    except Exception as e:
        print(json.dumps({"error": f"Internal Script Error: {str(e)}"}))

if __name__ == "__main__":
    main()
