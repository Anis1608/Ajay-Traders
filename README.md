# Ajay Traders - Web Application

Welcome to the **Ajay Traders** project! This repository contains the source code for the Ajay Traders web application, a platform for managing and showcasing weighing scales and flour mills. The project is divided into a **Frontend** (React + Vite) and a **Backend** (Node.js + Express).

## 🚀 Project Overview

Ajay Traders is a business website designed to:
- Showcase products (Weighing Scales, Flour Mills).
- Provide company information (About Us, Contact).
- Manage product inventory via an Admin Dashboard.
- Handle customer inquiries.

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **State Management & Data Fetching:** React Query (@tanstack/react-query)
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & BcryptJS
- **File Handling:** Multer (for image uploads), XLSX (for data import/export)
- **Email:** Nodemailer

## 📂 Project Structure

```
ajay-traders/
├── Backend/                # Node.js + Express Backend
│   ├── Controller/         # Request handlers
│   ├── Models/             # Mongoose models
│   ├── Routes/             # API routes
│   ├── index.js            # Entry point
│   └── ...
├── Frontend/               # React + Vite Frontend
│   ├── src/
│   │   ├── adminPages/     # Admin dashboard pages
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Public facing pages
│   │   └── ...
│   └── ...
├── DATA_MANAGEMENT_GUIDE.md # Guide for data handling
└── README.md               # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB installed locally or a MongoDB Atlas connection string

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ajay-traders
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd Backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `Backend` directory and configure the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Start the backend server:
```bash
npm start
# OR for development with nodemon
npm run dev 
# (Note: Check package.json scripts, you might need to install nodemon globally or use npx)
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../Frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173` (or another port if 5173 is busy).

## 🏃‍♂️ Running the Project

To run the full application locally, you need to have two terminal windows open:

1.  **Terminal 1 (Backend):**
    ```bash
    cd Backend
    nodemon index
    ```

2.  **Terminal 2 (Frontend):**
    ```bash
    cd Frontend
    npm run dev
    ```

## 📝 Features

- **Public Pages:** Home, About, Products, Contact.
- **Admin Dashboard:** Secure login for administrators to manage products.
- **Product Management:** Add, update, delete products.
- **Data Import/Export:** Bulk import/export of product data using Excel.
- **Responsive Design:** Fully optimized for mobile and desktop devices.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
