# Portfolio Contact Form Backend

Yeh ek simple Node.js + Express + Nodemailer backend hai jo portfolio ke
contact form se Gmail SMTP ke through email bhejta hai.

## Setup Steps

### 1. Dependencies install karo
```bash
cd portfolio-backend
npm install
```

### 2. Gmail App Password banao
1. Google Account -> **Security** me jao
2. **2-Step Verification** ON karo (mandatory)
3. Search bar me "App Passwords" search karo (ya yahan jao: https://myaccount.google.com/apppasswords)
4. App select karo "Mail", device "Other" -> naam do (e.g. "Portfolio")
5. 16-character password generate hoga (e.g. `abcd efgh ijkl mnop`) — yeh copy kar lo (spaces hata ke)

> ⚠️ Apna NORMAL Gmail password use mat karo, sirf App Password chalega.

### 3. `.env` file banao
`.env.example` ko copy karke `.env` rename karo, aur values fill karo:

```bash
cp .env.example .env
```

```
GMAIL_USER=youremail@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop      # 16 char, no spaces
RECEIVER_EMAIL=utkarshchaurasiya7272@gmail.com
PORT=5000
FRONTEND_URL=http://localhost:5500       # ya jo bhi URL pe portfolio open ho
```

### 4. Server run karo
```bash
npm start
```
Output: `Server running on http://localhost:5000`

### 5. Frontend connect karo
`main.js` me already update kar diya hai:
```js
const BACKEND_URL = 'http://localhost:5000';
```
Agar backend ko hosting (Render/Railway/etc.) pe deploy karo, to yahan
us live URL ko daal dena, e.g.:
```js
const BACKEND_URL = 'https://your-backend.onrender.com';
```

### 6. Test karo
- Portfolio site ko browser me kholo (Live Server / koi bhi static server se)
- Contact form fill karo -> "Send Message" pe click karo
- Aapko `RECEIVER_EMAIL` pe ek mail aayega + sender ko auto-reply jaayega

## Deployment (Free options)
- **Render.com** – free Node web service, env vars wahan dashboard me daal sakte ho
- **Railway.app** – similar, free tier available

Deploy karte time:
- Repo connect karo (ya zip upload)
- Build command: `npm install`
- Start command: `npm start`
- Environment Variables section me `.env` ki saari values add karo
- `FRONTEND_URL` ko apne deployed portfolio ke URL se update karo (CORS ke liye)
