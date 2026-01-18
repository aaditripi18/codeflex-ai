🏋️‍♂️ CodeFlex AI – AI Fitness Coach

CodeFlex AI is an AI-powered fitness coaching web application that enables users to have real-time voice conversations with an AI assistant to receive personalized fitness and diet guidance.

The project focuses on voice-based AI interaction, real-time communication, and scalable full-stack architecture, making it an ideal showcase of modern web and AI technologies.

🚀 Features

🎙️ Real-time AI voice conversation

🧠 AI-powered fitness & diet guidance

🔊 Low-latency speech interaction using WebRTC

📝 Live speech-to-text transcription

👤 Secure authentication & user profiles with Clerk

📊 Structured backend schema for fitness plans using Convex

💻 Responsive, modern UI with Next.js App Router

🛠️ Tech Stack
Frontend

Next.js (App Router)

React

TypeScript

Tailwind CSS

AI & Voice

Vapi Web SDK

LLM-based Conversational AI

WebRTC (Daily)

Backend / Data

Convex

Schema design

Mutations & queries for fitness plans

Active/inactive plan management

Authentication

Clerk

Tooling

Node.js

npm

Git & GitHub

📂 Project Structure
<img width="832" height="578" alt="image" src="https://github.com/user-attachments/assets/798cd1d6-ef83-4595-b871-4712be12a790" />


⚙️ Getting Started
1️⃣ Clone the repository
git clone https://github.com/aaditripi18/codeflex-ai.git
cd codeflex-ai

2️⃣ Install dependencies
npm install

3️⃣ Environment Variables

Create a .env.local file in the project root:

NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key


⚠️ .env.local is ignored by Git and should never be committed.

4️⃣ Run Convex (optional – backend)
npx convex dev


This generates Convex backend bindings and enables data persistence.

5️⃣ Start the development server
npm run dev


Open:

http://localhost:3000

🧠 How It Works

User logs in using Clerk authentication

User starts a voice call with the AI fitness coach

AI listens, responds, and guides the user in real time

Conversation state and transcripts are handled on the frontend

Fitness plan data models are designed using Convex for scalability

📌 Notes

The project emphasizes real-time AI interaction, not just text prompts

Backend persistence with Convex is designed and extensible

Ideal for showcasing AI + WebRTC + full-stack system design

🎯 Use Cases

AI-powered personal fitness coaching

Voice-enabled wellness applications

Conversational AI demos

Full-stack AI project for resumes & portfolios

🙌 Author

Aaditya Tripathi
GitHub: @aaditripi18

✅ After adding this README

Run:

git add README.md
git commit -m "Add project README"
git push
