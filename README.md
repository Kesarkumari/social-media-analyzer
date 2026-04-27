# 📱 Social Media Impact Analyzer
A full-stack MERN application to analyze your social media habits and their impact on your life.

---

## 🗂️ Project Structure
```
social-media-analyzer/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT auth middleware
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Response.js       # Response schema
│   ├── routes/
│   │   ├── auth.js           # /api/auth routes
│   │   └── responses.js      # /api/responses routes
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── server.js             # Express server
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Questionnaire.js
    │   │   └── Results.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── About.js
    │   │   ├── Auth.js
    │   │   ├── Contact.js
    │   │   ├── Dashboard.js
    │   │   └── Home.js
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── questions.js
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js
```

---

## ⚙️ Prerequisites
- **Node.js** v16+ ([https://nodejs.org](https://nodejs.org))
- **MongoDB** running locally OR a MongoDB Atlas URI
- **npm** (comes with Node.js)

---

## 🚀 Setup Instructions

### Step 1 — Clone / Extract the Project
Extract the zip into a folder and open a terminal in that folder.

---

### Step 2 — Backend Setup

```bash
cd backend
npm install
```

Open `backend/.env` and update if needed:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/social-media-analyzer
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

> ✅ If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

Start the backend:
```bash
npm run dev      # development (with nodemon)
# OR
npm start        # production
```

You should see:
```
MongoDB connected
Server running on port 5000
```

---

### Step 3 — Frontend Setup

In a **new terminal**:
```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**

> The frontend proxies API calls to `http://localhost:5000` via the `"proxy"` setting in `package.json`.

---

## 🌐 API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/signup` | Register with name, email, password |
| POST | `/api/auth/login` | Login with email, password → returns JWT |

### Responses
| Method | Route | Description | Auth Required |
|--------|-------|-------------|--------------|
| POST | `/api/responses/submit` | Submit answers + selfRating | ✅ |
| GET | `/api/responses/my` | Get your last 5 results | ✅ |

---

## 🗄️ Database Schemas

### User
```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (hashed, required)"
}
```

### Response
```json
{
  "userId": "ObjectId (ref: User)",
  "answers": "Object { questionId: score }",
  "score": "Number",
  "category": "Healthy | Moderate | High Impact | Addicted",
  "selfRating": "Number (1–10)",
  "platformUsage": "Object { instagram, youtube, tiktok, twitter, facebook, snapchat }"
}
```

---

## 📊 Score Categories

| Score | Category |
|-------|----------|
| 0–30 | 🟢 Healthy |
| 31–60 | 🟡 Moderate |
| 61–90 | 🟠 High Impact |
| 91+ | 🔴 Addicted |

Maximum possible score: **80 points** (20 questions × 4 max per question)

---

## 🎨 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6 |
| Styling | Tailwind CSS |
| Charts | Chart.js + react-chartjs-2 |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |

---

## 📝 Features
- ✅ JWT Authentication (signup / login)
- ✅ 20-question social media habit assessment
- ✅ Scoring & category classification
- ✅ Self-judgement slider (compare self vs actual)
- ✅ Bar chart — question-by-question breakdown
- ✅ Pie chart — platform usage distribution
- ✅ Heatmap — time vs productivity
- ✅ Gauge meter for score visualization
- ✅ Personalized advice per category
- ✅ History of past assessments
- ✅ Responsive dark UI

---

## 🛠️ Troubleshooting

**MongoDB connection error?**
- Make sure MongoDB is running: `mongod` or use MongoDB Atlas

**Port 5000 in use?**
- Change `PORT` in `backend/.env`

**Frontend can't reach backend?**
- Ensure backend is running on port 5000
- Check the `"proxy"` field in `frontend/package.json`

---

Built with ❤️ using the MERN Stack
