# 🧠 Prufy — Proof-of-Work Task Manager

🚀 **Live Demo:** https://prufy.vercel.app/

---

## 📌 Overview

Prufy is a full-stack productivity web application where users don’t just create tasks — they attach **verifiable proof (logs)** to track actual work done.

It focuses on accountability, transparency, and real progress rather than simple task completion.

---

## ✨ Highlights

- Full-stack real-time application  
- Proof-based productivity system  
- Multi-user interaction  
- Deployed and production-ready  

---

## 🚀 Features

- Authentication using Firebase Auth  
- Create, edit, and delete tasks  
- Add logs with file uploads (Cloudinary)  
- Real-time updates using Firestore  
- View other users’ public tasks  
- Search users by username  
- Public / Private task toggle  
- Proof-based productivity tracking  

---

## 🧠 Tech Stack

| Category        | Technology            |
|----------------|----------------------|
| Frontend       | React (Vite)         |
| Backend / DB   | Firebase Firestore   |
| Authentication | Firebase Auth        |
| File Storage   | Cloudinary           |
| Styling        | Custom CSS           |

---

## 📂 Project Structure

```bash
src/
├── components/
├── firebase.js
├── App.jsx
└── main.jsx
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/avaneeshsawant-git/Prufy.git
cd prufy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npm run dev
```

---

## 🧩 Core Data Structure

```bash
users
└── uid
    ├── username
    ├── email
    └── tasks
        └── taskId
            ├── task
            ├── description
            ├── isPublic
            ├── createdAt
            └── logs
                └── logId
                    ├── title
                    ├── fileUrl
                    ├── fileName
                    └── createdAt
```

---

## 🔄 How It Works

1. User logs in using Firebase Authentication  
2. Tasks are stored under the user’s document in Firestore  
3. Logs (proof of work) are added under each task  
4. Files are uploaded to Cloudinary and stored via URL  
5. Real-time listeners (`onSnapshot`) update the UI instantly  
6. Public tasks can be viewed by other users  

---

## ⚠️ Limitations
 
- Cloudinary file cleanup is manual  
- Limited filtering and sorting  

---

## 💡 Future Improvements

- Responsive design for mobile  
- Profile pictures  
- Advanced filtering and sorting  
- Cloudinary auto-delete integration  
- UI animations and transitions  
- Notification system  

---

## 🧾 Concept

> Most task managers track what you plan to do.  
> **Prufy tracks what you actually did.**

---

## 👨‍💻 Author

**Avaneesh Sawant**