# Outfit Atlas

## 📌 Project Overview

Outfit Atlas is a modern and intuitive e-commerce application designed for browsing, filtering, and managing clothing and accessories. It combines a rich static dataset with dynamic data fetched from a backend API, offering a seamless user experience for discovering new fashion items and sending inquiries.

### ✨ Features

- **Hybrid Data Display**: Integrates static and dynamic datasets.
- **Item Listing**: Browse T-shirts, Shirts, Pants, Jeans, Shoes, Sportswear, Watches, and Accessories.
- **Category Filtering**: Filter items by categories using an interactive filter bar.
- **Detailed Item View (Modal)**: View detailed info and image carousel in a modal.
- **Item Inquiry**: Send inquiries to simulate interaction with sellers.
- **Add New Item**: Authenticated users can add new items via `/add` route.
- **Responsive Design**: Fully responsive across all screen sizes.
- **Toast Notifications**: Feedback for actions like loading and inquiries via `react-toastify`.
- **Intuitive Navigation**: Includes top and bottom navigation bars.

---

## 🛠️ Technologies Used

### Frontend (Client)
- **React.js** – UI library
- **React Router DOM** – Routing
- **Tailwind CSS** – Styling
- **React Icons** – Icons
- **React Toastify** – Notifications
- **Vite** – Build tool (presumed)

### Backend (Server - Presumed)
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Multer**
- **Dotenv**

---

## 🚀 Getting Started

Follow these steps to set up and run the Outfit Atlas project locally.

### 📋 Prerequisites

- Node.js (LTS recommended)
- npm or yarn


### 🔧 1. Clone the Repository

```bash
git clone https://github.com/Sayantan-dev1003/Outfit-Atlas.git
cd outfit-atlas
```

### ⚙️ 2. Backend Setup

```bash
cd server
npm install
```

### 🎨 3. Frontend Setup

```bash
cd client
npm install
```

### 4. Add `.env` file in Backend folder

Create `.end` file in `client` folder. In that write these:-

```bash
PORT=5000

MONGODB_URI=mongodb://localhost:27017/Outfit-Atlas

EMAIL_USER=your_enail_address
EMAIL_PASS=your_email_address_password

ENQUIRY_RECEIVER_EMAIL=receiver_email_address

FRONTEND_URL=http://localhost:5173
```

---

## ▶️ Running the Application

### 1. Start Backend Server

```bash
cd server
npm start
```

Server should run on: `http://localhost:5000`

### 2. Start Frontend Server

```bash
cd client
npm run dev
```

Frontend should run on: `http://localhost:5173`

---

## 🧪 Usage

- **Browse Items**: Homepage displays items.
- **Filter by Category**: Use filter bar for targeted viewing.
- **Detailed View**: Click an item to open its modal.
- **Enquire**: Click “Enquire Now” in the modal to simulate an inquiry.
- **Add New Item**: Go to /add to submit new item details and images.