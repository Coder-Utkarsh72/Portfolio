require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ───────────────────────────────────── */
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
  })
);

/* ── Nodemailer Transporter (Gmail SMTP) ─────────────
   Gmail App Password chahiye, normal Gmail password nahi chalega.
   Setup: Google Account -> Security -> 2-Step Verification ON
          -> App Passwords -> "Mail" select -> 16 digit password copy
*/
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/* ── Health Check Route ──────────────────────────────*/
app.get('/', (req, res) => {
  res.send('Portfolio backend is running ✅');
});

/* ── Contact Form Route ──────────────────────────────*/
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required.',
      });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    const fullName = `${firstName} ${lastName}`;

    // Mail to YOU (the portfolio owner)
    const mailToOwner = {
      from: `"${fullName}" <${process.env.GMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // Auto-reply to the sender (optional, can be removed)
    const mailToSender = {
      from: `"Utkarsh Chaurasiya" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${firstName}!`,
      html: `
        <p>Hi ${firstName},</p>
        <p>Thanks for messaging me through my portfolio. I've received your message and will get back to you soon.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
        <br/>
        <p>Best,<br/>Utkarsh Chaurasiya</p>
      `,
    };

    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToSender);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
