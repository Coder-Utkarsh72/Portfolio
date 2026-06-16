# Utkarsh Chaurasiya — Portfolio

A personal developer portfolio built with HTML, CSS, and vanilla JavaScript.

🌐 **Live Site**: [portfolio-utkarsh-chaurasiya.vercel.app](https://portfolio-utkarsh-chaurasiya.vercel.app)

---

## Features

- Responsive design (mobile + desktop)
- Smooth scroll animations and reveal effects
- Skills section with animated progress bars
- Projects showcase
- Education timeline
- Contact form with EmailJS integration (no backend required)
- Parallax orb effects on mouse movement

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- EmailJS (contact form)
- Hosted on Vercel

## Folder Structure

```
Portfolio/
├── index.html       # Main HTML file
├── style.css        # All styles
├── main.js          # JavaScript (animations, contact form, etc.)
└── images/          # Profile and other images
```

## Contact Form Setup

Contact form uses [EmailJS](https://emailjs.com) — no backend needed.

To configure for your own use:
1. Create a free account on emailjs.com
2. Add a Gmail service and get your **Service ID**
3. Create an email template and get your **Template ID**
4. Get your **Public Key** from Account settings
5. Update `main.js` with your own IDs:

```js
emailjs.init('YOUR_PUBLIC_KEY');

emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { ... })
```

## Run Locally

No build step needed — just open `index.html` in a browser or use Live Server (VS Code extension).

## Connect

- GitHub: [Coder-Utkarsh72](https://github.com/Coder-Utkarsh72)
- LinkedIn: [utkarsh-chaurasiya](https://www.linkedin.com/in/utkarsh-chaurasiya-a16686294)
- Twitter/X: [@UChaurasiy56138](https://x.com/UChaurasiy56138)
- Email: utkarshchaurasiya7272@gmail.com

---

© 2026 Utkarsh Chaurasiya. Designed & built with care.
