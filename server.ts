import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client lazily or on demand
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Assistant Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message string is required." });
      return;
    }

    const ai = getGenAI();
    if (!ai) {
      res.json({
        reply: "Notice: The AI Assistant is operating in fallback informative mode because the GEMINI_API_KEY environment variable is not configured. For standard questions, please refer to the portal's verified directory guides or configure the API key in Settings > Secrets.",
      });
      return;
    }

    const systemInstruction = `You are "BharatSeva Assistant", an official, highly accurate, empathetic, and knowledgeable digital AI assistant for the BharatSeva Citizen Portal (serving citizens of Bihar and India).
Your purpose is to assist citizens, students, job seekers, and applicants with verified details regarding:
1. Government Jobs & Vacancies: BPSC, BSSC, CSBC Bihar Police, Bihar Teacher Recruitment (TRE), RRB Railways, SSC, UPSC, Banking, and State Depts.
2. Competitive Exams: BPSC 71st CCE, BSSC Inter Level, Bihar Police Constable, STET/CTET, UPSC Prelims, Admit Card dates, Result dates, Syllabus, and Physical Standards.
3. Government Certificates (RTPS Bihar): Caste Certificate, Income Certificate, Residential/Domicile Certificate, EWS Certificate, Non-Creamy Layer (NCL), LPC, Land Records.
4. Scholarships & Grants: Bihar Post Matric Scholarship (PMS), Mukhyamantri Kanya Utthan Yojana, Bihar Student Credit Card (BSCC), NMMSS, Central Sector Scholarships.
5. Welfare Schemes: PM Kisan Samman Nidhi, Ayushman Bharat (PM-JAY), Bihar Udyami Yojana, PM Awas Yojana, etc.

Guidelines for your responses:
- Answer clearly in English, Hindi, or Hinglish depending on how the user addresses you.
- Structure your answer with clear bullet points, bold key facts (e.g., **Eligibility**, **Required Documents**, **Important Dates**, **Official Portals**).
- Always remind users to verify details on official government portals (e.g., serviceonline.bihar.gov.in, bpsc.bih.nic.in, csbc.bih.nic.in).
- Be polite, encouraging, and accurate.`;

    const chatMessages = conversationHistory.map((item: { role: string; content: string }) => ({
      role: item.role === "user" ? "user" : "model",
      parts: [{ text: item.content }],
    }));

    // Generate content using Gemini 3.6 Flash
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        ...chatMessages,
        { role: "user", parts: [{ text: message }] },
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Thank you for contacting BharatSeva. Please check the official government portal for further guidelines.";

    res.json({ reply });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: "An error occurred while communicating with the AI Assistant. Please try again later.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BharatSeva Portal server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
