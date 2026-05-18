# Learning Next.js: Full-Stack Authentication Project

Welcome to the **Learning** project! This repository is a dedicated workspace for mastering **Next.js** by building a robust, full-stack application from scratch. The primary focus of this project is implementing a complete authentication system with modern web development practices.

## 🚀 About Next.js

Next.js is a powerful React framework that enables you to build high-performance web applications with ease. It provides a developer-friendly experience with features like:

- **App Router:** A file-system based router built on top of React Server Components.
- **Server Components:** Render components on the server by default for better performance and SEO.
- **Client Components:** Use the full power of React hooks and browser APIs where needed.
- **API Routes:** Build robust backend APIs within the same project using Route Handlers.
- **Data Fetching:** Simplified data fetching with `fetch` and server-side rendering.
- **Middleware:** Run code before a request is completed for authentication and redirects.
- **Built-in SEO:** Easy management of metadata for search engine optimization.

---

## 🛠️ Project Implementation

In this project, I am implementing a comprehensive authentication flow to understand how Next.js handles complex state, security, and backend integrations.

### Key Features

1.  **User Authentication:**
    - **Signup:** Secure registration with password hashing using `bcryptjs`.
    - **Login:** Session-based authentication using **JSON Web Tokens (JWT)**.
    - **Logout:** Securely clearing session cookies.
2.  **Email Verification:**
    - Integration with **Nodemailer** to send verification emails.
    - Token-based verification system to ensure valid user emails.
3.  **Database Integration:**
    - Using **MongoDB** with **Mongoose** for data persistence.
    - Singleton connection pattern to optimize serverless execution.
4.  **Secure Routing:**
    - Protected routes using JWT stored in **HTTP-only cookies**.
    - Dynamic routing for user profiles (`/profile/[id]`).
5.  **Modern UI:**
    - Styled with **Tailwind CSS 4** for a sleek, responsive design.
    - Interactive feedback using `react-hot-toast`.

---

## 💻 Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Database:** MongoDB
- **ORM:** Mongoose
- **Auth:** JWT (JsonWebToken) & Bcryptjs
- **Mailing:** Nodemailer
- **Styling:** Tailwind CSS 4

---

## 📂 Project Structure

- `app/api/`: Backend API routes for authentication and user data.
- `app/about/`: Detailed technical documentation of the codebase.
- `app/profile/`: User dashboard and dynamic profile pages.
- `assists/`: Helper functions for JWT extraction and email handling.
- `lib/`: Database connection configuration.
- `models/`: Mongoose schemas and models.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI (Local or Atlas)
- SMTP credentials for email (e.g., Gmail App Password)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd learning
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add:
    ```env
    MONGODB_URI=your_mongodb_uri
    TOKEN_SECRET=your_jwt_secret
    DOMAIN=http://localhost:3000
    SMTP_USER=your_email
    SMTP_PASS=your_email_password
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to see the application in action.

---

## 📖 Learning Objectives

- [x] Understand Next.js App Router and File-based Routing.
- [x] Implement Full-Stack Authentication with JWT.
- [x] Integrate MongoDB and Mongoose with Next.js.
- [x] Handle Emails in a Serverless Environment.
- [x] Manage Protected Routes and Middleware.
- [ ] Implement Password Reset Functionality.
- [ ] Add Form Validation with Zod.

---

Built with ❤️ by a Ro706.
