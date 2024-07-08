<div align="center">
    <h1><br/>DevSync - A Realtime Code Editor</h1>
    <p>Your solution for real-time project collaboration. Create and join projects, edit code together, and manage your workspace with ease. Enhance your teamwork today.</p>
</div>

## 🔍 Explore Features

- 🌟 **Welcome Screen**: A friendly welcome screen greets new users upon visiting the website.
- 🏠 **Home Page**: Options to create a new project or join an existing one created by another user, with sections for displaying created projects and recently joined projects, presented as cards for better UI.
- 📃 **Project Cards**: Display the project name and creator, options to delete the project or copy the project ID, show the count of online users currently in the project, and display the number of files and folders within the project.
- 🧩 **Unique Project ID**: Each project is assigned a unique project ID for easy identification and collaboration.
- 🔍 **Project Availability Check**: Upon loading a project, the system checks if the project is available and displays a "Project Not Found" screen if it's not available.
- ⏳ **Loading Screen**: A loading screen is displayed while checking the project's availability on the server.
- 🗂️ **Explorer Panel**: Users can create, rename, and delete folders and files with appropriate icons based on file extensions, and nested folder creation is supported, similar to most code editors.
- 👥 **Connected Users List**: A panel showing the list of all connected clients, including their online status.
- 🖊️ **Collaborative Code Editor**: Real-time synchronization of typed text in selected files among all connected users, syntax highlighting for various programming languages, tabs for opening multiple files with options to close tabs by clicking on tab icons, auto-suggestions based on the programming language, and instant synchronization of code changes, files, folders, and chats for all users within the project.
- 🎨 **Editor Customization**: Options to change the theme of the code editor, adjustable font size and line height for a personalized coding experience, and comprehensive language support for syntax highlighting and auto-suggestions for the most popular programming languages.
- 💬 **Real-time Chat System**: A chat system for all connected users to communicate in real-time, ensuring synchronization using socket.io.
- 🎭 **Illustrative Feedback**: SVG illustrations to enhance user experience when certain actions are not available.
- 📣 **User Notifications**: Notifications for when a new user joins or leaves the project.

## 🌐 View Live Demo

You can view the live preview of the project [here](https://syncdev.vercel.app/).

## 🛠️ Tech Used

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Socket.io](https://img.shields.io/badge/socket.io-%23000000.svg?style=for-the-badge&logo=socket.io&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn](https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

## ⚙️ Setup Instructions

1. **Fork this repository:** Click the Fork button located in the top-right corner of this page to fork the repository.
2. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/devsync.git
   ```
3. **Set .env file:**
   Inside the client and server directories rename the `.env.example` file to `.env` and set the following environment variables:

   Client:

   ```bash
   NEXT_PUBLIC_SOCKET_URL=<your_server_url>
   ```

   Server:

   ```bash
   PORT=3000
   CORS_ORIGIN = http://localhost:3000
   ```

4. **Install dependencies:**
   Navigate to the client and server directories separately and run:
   ```bash
    yarn
   ```
5. **Start the frontend and backend servers:**  
   Client:
   ```bash
   cd client
   yarn run dev
   ```
   Server:
   ```bash
   cd server
   yarn run dev
   ```
6. **Access the application:**
   Open a browser and enter the following URL:
   ```bash
   http://localhost:3000/
   ```

## 💖 Support Us

Enjoying this project? Give it a 🌟 star to help others find it and to motivate continued development.
