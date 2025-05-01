


# Temp Mail Project

A temporary email receiving service built using Django for backend, aiosmtpd for SMTP server, and React (Vite) for the frontend.

## Features

- Receive emails using your own temporary email address.
- Emails are stored in a Django backend.
- Custom SMTP server running on localhost:1025.
- Frontend built using React and Vite.
- Includes test script to send emails.


## 🧰 Requirements

- Python 3.8+
- Node.js (for frontend)


Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

---

## 🚀 Getting Started

### 1. Start the Django Backend

```bash
cd backend
python manage.py migrate
python manage.py runserver
```

### 2. Start the SMTP Server

In a **new terminal**, run:

```bash
cd backend
python smtp_server.py
```

This runs a local SMTP server on `localhost:1025`.

### 3. Run the Frontend

Make sure you have dependencies installed:

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing Email Reception

To test the SMTP server, use the provided `send_email.py` script:

```bash
cd backend
python send_email.py
```
make sure to modify this line

receiver = "<Your_TEMP_MAIL>"  # Add your temp mail

If the receiver email matches a valid `TempEmail` entry in the database, the email will be saved in the database and visible in the frontend.



## 📌 Notes

- Emails must be sent to addresses that already exist in the `TempEmail` model.
- SMTP server only accepts mail on `127.0.0.1:1025`.

---

