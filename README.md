# 📱 Social Media Impact Analyzer

A full-stack MERN application to analyze social media habits and their impact on productivity, mental health, and daily life.

---

# 👨‍💻 Team Details

| Name | Roll Number |
|------|-------------|
| Kesar Kumari | 2210991780 |
| Kavya | 2210991775 |
| Shalini Kumari | 2210992284 |
| Matalika Dutta | 2210991902 |

---

# 🏫 Institute Details

Chitkara University Institute of Engineering and Technology,  
Chitkara University, Punjab, India

---

# 📌 Research Paper Title

## Social Media Impact on Mental Health

---

# 📧 Team Emails

- kesar1780.be22@chitkara.edu.in
- kavya1775.be22@chitkara.edu.in
- shalini2284.be22@chitkara.edu.in
- matalika1902.be22@chitkara.edu.in

---

# 📌 Project Type

Research Project

---

# 📌 Current Status

Completed

---

# 🗂️ Repository Structure

```text
Social Media Impact Analyzer (2210991780_2210991775_2210992284_2210991902)
│
├── IPR Submission Proof/
│   ├── Research_Paper_Submission.png
│   ├── Patent_Form.pdf
│   ├── Copyright_Form.pdf
│   └── Submission_Proof.png
│
├── Report and PPT/
│   ├── Final_Report.pdf
│   └── Project_Presentation.pptx
│
├── Source code/
│   └── social-media-analyzer/
│       ├── backend/
│       └── frontend/
│
├── Screenshots/
│   ├── HomePage.png
│   ├── Dashboard.png
│   ├── Results.png
│   └── Login.png
│
└── README.md
```

---

# ⚙️ Prerequisites

- Node.js v16+
- MongoDB Local OR MongoDB Atlas
- npm

---

# 🚀 Setup Instructions

## Step 1 — Clone / Extract the Project

Extract the zip file and open terminal inside the project folder.

---

# 🔧 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/social-media-analyzer
JWT_SECRET=your_super_secret_jwt_key
```

If using MongoDB Atlas:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
```

Start backend server:

```bash
npm run dev
```

OR

```bash
npm start
```

Expected Output:

```text
MongoDB connected
Server running on port 5000
```

---

# 💻 Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will run at:

```text
http://localhost:3000
```

---

# 🌐 API Endpoints

## Authentication APIs

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/signup | Register User |
| POST | /api/auth/login | Login User |

---

## Response APIs

| Method | Route | Description | Auth Required |
|--------|-------|-------------|--------------|
| POST | /api/responses/submit | Submit Assessment | ✅ |
| GET | /api/responses/my | Get Previous Results | ✅ |

---

# 🗄️ Database Schemas

## User Schema

```json
{
  "name": "String",
  "email": "String",
  "password": "Hashed String"
}
```

---

## Response Schema

```json
{
  "userId": "ObjectId",
  "answers": {},
  "score": "Number",
  "category": "Healthy | Moderate | High Impact | Addicted",
  "selfRating": "Number",
  "platformUsage": {}
}
```

---

# 📊 Score Categories

| Score Range | Category |
|-------------|----------|
| 0–30 | 🟢 Healthy |
| 31–60 | 🟡 Moderate |
| 61–90 | 🟠 High Impact |
| 91+ | 🔴 Addicted |

Maximum Score: 80

---

# 🎨 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB |
| Authentication | JWT + bcryptjs |
| Charts | Chart.js |
| HTTP Client | Axios |

---

# ✨ Features

- ✅ JWT Authentication
- ✅ Login / Signup
- ✅ 20 Question Assessment
- ✅ Score Calculation
- ✅ Category Classification
- ✅ Personalized Suggestions
- ✅ Dashboard Analytics
- ✅ Bar Chart Visualization
- ✅ Pie Chart Visualization
- ✅ Heatmap Analysis
- ✅ Gauge Meter
- ✅ Assessment History
- ✅ Responsive UI

---

# 📷 Screenshots

## Home Page
(Add Screenshot Here)

## Dashboard
(Add Screenshot Here)

## Results Page
(Add Screenshot Here)

## Login Page
(Add Screenshot Here)

---

# 🛠️ Troubleshooting

## MongoDB Connection Error

Make sure MongoDB service is running:

```bash
mongod
```

OR use MongoDB Atlas.

---

## Port Already in Use

Change port inside `.env`

```env
PORT=5001
```

---

## Frontend Cannot Connect to Backend

Ensure backend is running and check proxy inside frontend/package.json:

```json
"proxy": "http://localhost:5000"
```

---

# 📁 Important Notes

- Do NOT upload `.env`
- Add `.gitignore`
- Add collaborator:

```text
cse.ph4e@chitkara.edu.in
```

---

# 📌 GitHub Submission Details

This repository contains:

- IPR Submission Proof
- Final Report and PPT
- Complete Source Code
- Screenshots
- README Documentation

---

# ❤️ Built With MERN Stack

MongoDB + Express.js + React.js + Node.js
