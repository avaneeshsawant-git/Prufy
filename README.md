# 🧠 Prufy — Proof-of-Work Task Manager

Prufy is a full-stack productivity web application where users don’t just create tasks — they attach **verifiable proof (logs)** to track actual work done.

---

## 🚀 Features

- 🔐 Firebase Authentication (Login / Signup)
- 🗂 Create, edit, delete tasks
- 📒 Add logs with file uploads (Cloudinary)
- ⚡ Real-time updates using Firestore
- 🌐 View other users’ public tasks
- 🔍 Search users by username
- 🔄 Toggle between private/public tasks
- 🧾 Proof-based productivity tracking

---

## 🧠 Tech Stack

- React (Vite)
- Firebase Firestore
- Firebase Auth
- Cloudinary (file uploads)
- CSS (custom UI)

---

## 📂 Project Structure


src/
├── components/
├── firebase.js
├── App.jsx
└── main.jsx


---

## ⚙️ Setup

### Clone repo

git clone https://github.com/your-username/prufy.git

cd prufy


### Install dependencies

npm install


### Run project

npm run dev


---

## 🔐 Environment Variables (optional)

Create `.env`:


VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project


---

## ⚠️ Limitations

- Not fully responsive yet
- Cloudinary cleanup is manual
- Public/private filtering can be improved

---

## 💡 Future Improvements

- Responsive UI
- Profile pictures
- Better task filtering
- Cloudinary auto-delete

---

## 🧾 Description

Prufy is a proof-of-work based productivity platform where users track tasks through verifiable logs and can explore publicly shared work from other users.

---

## 👨‍💻 Author

Avaneesh Sawant