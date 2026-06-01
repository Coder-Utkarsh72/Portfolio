# 🎨 Portfolio Website

A stunning, modern single-page portfolio built with pure HTML, CSS, and JavaScript.
No frameworks, no dependencies, no build step — just open `index.html` in a browser.

---

## 📁 File Structure

```
portfolio/
├── index.html        ← Main HTML (structure & content)
├── css/
│   └── style.css     ← All styles, variables, animations, responsive
├── js/
│   └── main.js       ← All interactivity (cursor, scroll, animations)
└── README.md
```

---

## ✏️ How to Personalise

### 1. Your name & title
Open `index.html` and replace:
- `Your Name` / `Your Full Name` → your actual name
- `YN` (nav logo) → your initials
- The tagline under `.hero-tagline` → your tagline
- `Full Stack Developer & Designer` → your profession

### 2. Hero stats
Find `.hero-stats` and update the numbers and labels.

### 3. About section
- Replace the `👤` placeholder with a real `<img>` tag pointing to your photo.
- Update the floating tags (`.tag-loc`, `.tag-exp`, `.tag-status`) with your details.
- Edit the three `<p>` paragraphs with your own bio.
- Update the `.chip` items with your personal traits.

### 4. Skills
Edit the `.skill-bar-item` blocks in `index.html`:
- Change the skill names and `data-width` percentages.
- Add or remove rows freely.
- Update the `.tech-pill` items in the DevOps card.

### 5. Work Experience
Each `.timeline-item` = one job. Update:
- Period, location, role, company, description, tags.
- Add/remove items as needed.

### 6. Projects
Each `.project-card` = one project. Update:
- The gradient in `style=""` on `.project-thumb-bg`.
- Tags, title, description, and link hrefs.
- The featured card spans 2 columns on desktop.

### 7. Education & Achievements
Update `.edu-card` blocks and `.achievement-item` blocks.

### 8. Contact
Replace all placeholder emails, LinkedIn, GitHub, and Twitter URLs with yours.

### 9. Colors
Edit the CSS variables at the top of `css/style.css`:
```css
:root {
  --accent:  #e8ff47;   /* Primary accent (yellow-green) */
  --accent2: #7c6aff;   /* Secondary accent (violet)     */
  --bg:      #0a0a0f;   /* Main background                */
  /* … */
}
```

---

## 🚀 Deployment

Just drag the entire `portfolio/` folder to any static host:

| Host | How |
|------|-----|
| **GitHub Pages** | Push to a repo → Settings → Pages → Deploy from `main` |
| **Netlify** | Drag & drop the folder on netlify.com/drop |
| **Vercel** | `npx vercel` in the folder |
| **Surge** | `npx surge` in the folder |

---

## 🌟 Features

- Custom animated cursor with hover/click states
- Scroll-triggered reveal animations
- Skill bar fill animations on scroll
- Counter animation on hero stats
- Parallax orbs reacting to mouse movement
- Frosted-glass navbar on scroll
- Scroll progress bar
- Mobile-responsive with hamburger menu
- Contact form with validation + send animation
- Zero dependencies — loads in milliseconds

---

Built with ❤️ using HTML · CSS · JavaScript
