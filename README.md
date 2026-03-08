# 📍 Nearby Chat – Location Based Chat Application

## 🚀 Project Description
Nearby Chat is a location-based web application that allows users to chat with people within a **5 km radius**. The platform focuses on **temporary and anonymous communication** where all chat messages are **automatically deleted after 1 hour** to maintain privacy.

The goal of this project is to help people interact with others nearby in real time without sharing personal information.

---

## ✨ Features

- 📍 **Location Based User Detection**
  - Finds users within a 5 km radius.

- 💬 **Real-time Chat**
  - Users can send and receive messages instantly.

- ⏳ **Auto Delete Messages**
  - All messages are automatically deleted after **1 hour**.

- 👤 **Anonymous Chat**
  - Users can chat without sharing personal details.

- 🗺 **Interactive Map**
  - Displays nearby users on a map interface.

- 🔒 **Privacy Focus**
  - No permanent storage of chat messages.

---

## 🧠 How It Works

1. User opens the website.
2. The browser requests **location permission**.
3. The system calculates distance between users.
4. Users within **5 km radius** are detected.
5. After connecting, users can start chatting.
6. Messages automatically **expire after 1 hour**.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Leaflet (Map)

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Other Tools
- Socket.io (for real-time chat)
- Geolocation API
- Haversine Formula (distance calculation)

---

## 📐 Distance Calculation

The application uses the **Haversine Formula** to calculate the distance between two geographic coordinates.

Formula:

distance = 2 × R × asin( √( sin²((lat2-lat1)/2) + cos(lat1) × cos(lat2) × sin²((lon2-lon1)/2) ) )

Where:
- R = 6371 km (Earth radius)

---

## 📂 Project Structure
nearby-chat
│
├── frontend
│ ├── components
│ ├── pages
│ ├── Map.jsx
│ ├── Chat.jsx
│ └── App.jsx
│
├── backend
│ ├── models
│ ├── routes
│ ├── socket
│ └── server.js
│
└── README.md