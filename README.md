<<<<<<< HEAD
# Gamify — Full Deployment Guide

## Structure
```
gamify/
├── backend/          ← FastAPI (deploy on Render)
├── frontend/         ← React/Vite (deploy on Vercel)
└── render.yaml       ← Render one-click config
```

---

## BACKEND — Render.com (Free)

### Option A: One-Click Blueprint
1. render.com → **New** → **Blueprint**
2. Connect GitHub repo → Select `gamify`
3. Render detects `render.yaml` → creates DB + backend automatically
4. Wait 5-10 min for deploy

### Option B: Manual
1. render.com → **New** → **Web Service**
2. Connect GitHub repo
3. Settings:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Environment Variables:
   ```
   DATABASE_URL  = (from Render PostgreSQL → Internal URL)
   SECRET_KEY    = any-random-string-here
   ALGORITHM     = HS256
   ACCESS_TOKEN_EXPIRE_MINUTES = 30
   REFRESH_TOKEN_EXPIRE_DAYS   = 7
   ```

### After Backend Deploy — Seed Database
Render → Your service → **Shell** tab:
```bash
python -m alembic upgrade head
python -m app.seed_data
```

Copy your backend URL: `https://YOUR-APP.onrender.com`

---

## FRONTEND — Vercel.com (Free)

1. vercel.com → **New Project** → Import GitHub repo
2. Settings:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**:
   ```
   VITE_API_URL = https://YOUR-RENDER-BACKEND.onrender.com/api
   ```
4. **Deploy**

Your site: `https://gamify-xxx.vercel.app`

---

## LOCAL DEVELOPMENT

```bash
# Backend
cd backend
pip install -r requirements.txt
python -m alembic upgrade head
python -m app.seed_data
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open: http://127.0.0.1:5173

---

## IMPORTANT NOTES

1. Free Render tier sleeps after 15min inactivity — first request takes 30-50s
2. Free Render PostgreSQL expires after 90 days — export data before then
3. VITE_API_URL must be set in Vercel — without it frontend can't reach backend
=======
# GamiFY
>>>>>>> 1eadd8d7603cb2f793032ff84bc60112590cda09
