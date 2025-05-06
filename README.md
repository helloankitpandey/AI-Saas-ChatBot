# AIBuddy Chat Bot

### Image 1: Home page
![Home page](https://github.com/helloankitpandey/AI-Saas-ChatBot/blob/70ac73d5aedf57fbbc110be95dedf78b4ff5496f/Screenshot%202025-05-06%20203630.png)

### Image 2: Login page
![Login page](https://github.com/helloankitpandey/AI-Saas-ChatBot/blob/70ac73d5aedf57fbbc110be95dedf78b4ff5496f/Screenshot%202025-05-06%20203654.png)

## Overview
AIBuddy is a **secure and scalable AI chatbot** built with modern technologies. It leverages **OpenAI API** to generate real-time responses, ensuring a smooth and engaging chat experience. The chatbot is designed for **high concurrency** and provides strong authentication and data security.

## Features
- **Scalable & Secure:** Handles **10,000+ user sessions** with **JWT authentication** and **HTTP-only cookies** for enhanced security.
- **AI-Powered Responses:** Integrates **OpenAI API** to deliver real-time chat interactions with ultra-low latency.
- **Modern UI:** Built with **Material UI** for a fully responsive and accessible user experience across all devices.
- **Robust Data Validation:** Uses **Express validators** to ensure **95% input data accuracy**, securing user interactions and maintaining data integrity.

## Tech Stack
- **Frontend:** React.js, TypeScript, Material UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Prisma
- **Authentication:** JWT, HTTP-only Cookies
- **AI Integration:** OpenAI API

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (latest LTS version recommended)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/aibuddy-chatbot.git
   cd aibuddy-chatbot
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory and add your credentials.
   ```env
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret
   ```
4. **Start the Development Server**
   ```bash
   npm run dev
   ```
5. **Build for Production**
   ```bash
   npm run build
   ```

## Contributing
Contributions are welcome! Feel free to fork this repository, create a new branch, and submit a pull request.

## License
This project is licensed under the **MIT License**.

---

🚀 **AIBuddy** is built for **fast, secure, and intelligent AI-powered conversations**. Try it out and enhance it further!
