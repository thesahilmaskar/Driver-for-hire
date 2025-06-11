# 🚗 Driver-for-Hire Aggregator Web App

This is a web-based Driver-for-Hire Aggregator application built with **Node.js**, **Express**, and **HTML/CSS**. It allows users to register, log in, and book available drivers. Admins can manage bookings and drivers from a simple dashboard. This project uses **session-based authentication** and stores data in a **JSON file**.

---

## 📽️ Demo Video

Watch the full walkthrough and explanation of the project here:  
📌 [Video Link – Demo & Explanation](https://drive.google.com/file/d/1Y10yRe3P1-050GE752UhFiT62_Wbz4WE/view?usp=drive_link)

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript
- **Database:** JSON file-based storage (no external database)
- **Authentication:** Session-based using `express-session`

---

## 🚀 Features

- User Sign Up / Login / Logout
- Book a driver
- View booking history
- Admin dashboard:
  - View and manage all users
  - View and assign drivers
  - View bookings

---

## 📂 Project Structure
Driver-for-hire/
├── public/
│ ├── css/
│ │ └── styles.css # Custom UI styling
│ └── js/
├── views/
│ ├── index.html # Home Page
│ ├── login.html # User Login
│ ├── register.html # User Registration
│ ├── dashboard.html # Admin/User Dashboard
├── users.json # Stores user and driver data
├── bookings.json # Stores booking history
├── server.js # Main backend server logic
├── package.json

yaml
Copy
Edit


---

## 🔑 Credentials for Testing

**Admin Login**
- Username: `admin`
- Password: `admin123`

**User Login**
- Sign up from the registration page

---

## 📌 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/thesahilmaskar/Driver-for-hire.git
   cd Driver-for-hire
npm install
node server.js
http://localhost:3000


