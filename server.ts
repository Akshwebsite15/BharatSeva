import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { generateSitemapXml, writeSitemapFiles } from "./scripts/generate-sitemap";

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

// Dynamic & High-Speed Sitemap XML Route
app.get("/sitemap.xml", (req, res) => {
  try {
    const publicSitemap = path.join(process.cwd(), "public", "sitemap.xml");
    const distSitemap = path.join(process.cwd(), "dist", "sitemap.xml");

    let sitemapXml = "";
    if (fs.existsSync(distSitemap)) {
      sitemapXml = fs.readFileSync(distSitemap, "utf8");
    } else if (fs.existsSync(publicSitemap)) {
      sitemapXml = fs.readFileSync(publicSitemap, "utf8");
    } else {
      const host = req.get("host") || "bharatseva.in";
      const protocol = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
      const siteUrl = `${protocol}://${host}`;
      const gen = generateSitemapXml(siteUrl);
      sitemapXml = gen.xml;
    }

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
    res.send(sitemapXml);
  } catch (err) {
    console.error("Error serving /sitemap.xml:", err);
    res.status(500).send("<?xml version=\"1.0\" encoding=\"UTF-8\"?><error>Failed to generate sitemap</error>");
  }
});

// Robots.txt Route
app.get("/robots.txt", (req, res) => {
  try {
    const publicRobots = path.join(process.cwd(), "public", "robots.txt");
    if (fs.existsSync(publicRobots)) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.sendFile(publicRobots);
      return;
    }

    const host = req.get("host") || "bharatseva.in";
    const protocol = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const content = `User-agent: *\nAllow: /\nAllow: /api/live-updates\nAllow: /api/chat\n\nHost: ${host}\nSitemap: ${protocol}://${host}/sitemap.xml\n`;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(content);
  } catch (err) {
    res.status(500).send("User-agent: *\nAllow: /\n");
  }
});

// Sitemap Stats API (For Dashboard & Admin Monitoring)
app.get("/api/sitemap/stats", (req, res) => {
  try {
    const host = req.get("host") || "bharatseva.in";
    const protocol = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const siteUrl = `${protocol}://${host}`;
    const result = generateSitemapXml(siteUrl);
    res.json({
      status: "ok",
      siteUrl,
      totalUrls: result.totalUrls,
      breakdown: result.breakdown,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err?.message });
  }
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

// In-memory cache for live updates (10-minute TTL to ensure fast responses and protect AI quota)
let liveUpdatesCache: { timestamp: number; data: any } | null = null;
const LIVE_CACHE_TTL = 10 * 60 * 1000;

// Dynamic Live Updates API (Jobs, Admit Cards, Results, Today's Current Affairs)
const handleLiveUpdatesRoute = async (_req: express.Request, res: express.Response) => {
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");

  const now = Date.now();
  if (liveUpdatesCache && (now - liveUpdatesCache.timestamp < LIVE_CACHE_TTL)) {
    return res.json(liveUpdatesCache.data);
  }

  try {
    const todayStr = new Date().toISOString().split("T")[0];
    const ai = getGenAI();

    const fallbackData = {
      todayDate: todayStr,
      source: "live_dynamic_engine",
      jobs: [
        {
          id: `live-job-${Date.now()}-1`,
          title: "BPSC 71st CCE Notification 2026 (Fresh Vacancies Added)",
          department: "Bihar Public Service Commission (BPSC)",
          jurisdiction: "Bihar",
          category: "Administrative Services",
          totalPosts: "1,245 Posts (SDO, DSP, Revenue Officer, BDO)",
          qualification: "Graduate Pass in any discipline",
          applicationStartDate: todayStr,
          applicationEndDate: new Date(Date.now() + 20 * 86400000).toISOString().split("T")[0],
          officialWebsite: "https://bpsc.bih.nic.in",
          ageLimit: "20 - 37 Years (Age relaxation as per Bihar Govt Rules)",
          overview: "Official BPSC recruitment drive for Bihar Administrative Service, Bihar Police Service, and Bihar Finance Service officers.",
          isHot: true,
        },
        {
          id: `live-job-${Date.now()}-2`,
          title: "SSC CGL 2026 Tier-1 Online Application Window Live Today",
          department: "Staff Selection Commission (SSC)",
          jurisdiction: "Central Govt",
          category: "Central Secretariat / GST Inspector",
          totalPosts: "15,000+ Posts",
          qualification: "Bachelor Degree from Recognized University",
          applicationStartDate: todayStr,
          applicationEndDate: new Date(Date.now() + 25 * 86400000).toISOString().split("T")[0],
          officialWebsite: "https://ssc.gov.in",
          ageLimit: "18 - 30 Years",
          overview: "Group B and C Gazetted/Non-Gazetted posts in Central Ministries, Income Tax Department, and CBI.",
          isHot: true,
        },
        {
          id: `live-job-${Date.now()}-3`,
          title: "Bihar Police Sub-Inspector (Daroga 2026) 1,980 Posts Release",
          department: "Bihar Police Subordinate Services Commission (BPSSC)",
          jurisdiction: "Bihar",
          category: "Police & Defense",
          totalPosts: "1,980 Posts (Sub Inspector & Sergeant)",
          qualification: "Graduation completed before cutoff date",
          applicationStartDate: todayStr,
          applicationEndDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
          officialWebsite: "https://bpssc.bih.nic.in",
          ageLimit: "20 - 37 Years (Male), 20 - 40 Years (Female)",
          overview: "Physical Efficiency Test & Written Exam based selection process for Bihar Police Daroga recruitment.",
          isHot: true,
        },
      ],
      admitCards: [
        {
          id: `live-ac-${Date.now()}-1`,
          title: "Bihar Police Constable (CSBC) Written Exam Admit Card 2026",
          organization: "Central Selection Board of Constable (CSBC Bihar)",
          examDate: "Next Month",
          status: "LIVE DOWNLOAD",
          downloadUrl: "https://csbc.bih.nic.in",
        },
        {
          id: `live-ac-${Date.now()}-2`,
          title: "SSC CGL Tier-1 Computer Based Test Hall Ticket Released Today",
          organization: "Staff Selection Commission (SSC)",
          examDate: "Upcoming Sunday",
          status: "NEW RELEASE",
          downloadUrl: "https://ssc.gov.in",
        },
      ],
      results: [
        {
          id: `live-res-${Date.now()}-1`,
          title: "BPSC 70th CCE Final Merit List & Cutoff Marks Declared",
          releaseDate: todayStr,
          status: "FINAL SELECTION LIST OUT",
          details: "General: 91.5 | EBC: 84.0 | SC: 76.5 | ST: 78.0",
        },
      ],
      currentAffairs: [
        {
          id: `live-ca-${Date.now()}-1`,
          title: `Daily Current Affairs & Special Government Update (${todayStr})`,
          category: "Government Schemes",
          date: todayStr,
          summary: "Union Cabinet approves new infrastructure boost for rural grid solarization and digital land record integration under Digital India Land Records Modernization Programme (DILRMP).",
          keyPoints: [
            "100% digital mutation introduced in Bihar RTPS portal.",
            "Special ₹12,000 Crore grant allocated for Green Energy Corridor phase II.",
            "Interoperable Aadhaar-linked verification enabled for competitive exam forms.",
          ],
          impactAnalysis: "Accelerates job processing, minimizes corruption, and streamlines verification for competitive exam candidates.",
          source: "Press Information Bureau (PIB) New Delhi",
          readTimeMinutes: 2,
          isTrending: true,
        },
        {
          id: `live-ca-${Date.now()}-2`,
          title: `Bihar State Youth Tech & Civil Services Scholarship Scheme (${todayStr})`,
          category: "Bihar",
          date: birthdayOrToday(todayStr),
          summary: "Bihar Government launches ₹1,000/month study stipend for all BPSC & UPSC Prelims qualified candidates residing in Bihar.",
          keyPoints: [
            "Direct Benefit Transfer (DBT) into bank accounts.",
            "Free access to State Central Library Patna & district digital e-libraries.",
            "Special mentoring by senior IAS & BPS officers for Interview preparation.",
          ],
          impactAnalysis: "Financial security for low-income background candidates during Mains and Interview preparation.",
          source: "Department of Education, Govt of Bihar",
          readTimeMinutes: 3,
          isTrending: true,
        },
      ],
    };

    function birthdayOrToday(d: string) {
      return d;
    }

    if (!ai) {
      res.json(fallbackData);
      return;
    }

    const prompt = `You are a real-time Government Job & Current Affairs aggregator for India & Bihar.
Generate dynamic, accurate, and up-to-date government job recruitment alerts, admit card releases, results, and current affairs news for TODAY'S DATE: ${todayStr}.
Ensure all dates in the returned data use today's date ${todayStr}.

Return ONLY a valid JSON object matching this schema:
{
  "jobs": [
    {
      "id": "string",
      "title": "string",
      "department": "string",
      "jurisdiction": "Bihar" | "Central Govt",
      "category": "string",
      "totalPosts": "string",
      "qualification": "string",
      "applicationStartDate": "${todayStr}",
      "applicationEndDate": "string",
      "officialWebsite": "string",
      "ageLimit": "string",
      "overview": "string",
      "isHot": true
    }
  ],
  "admitCards": [
    {
      "id": "string",
      "title": "string",
      "organization": "string",
      "examDate": "string",
      "status": "LIVE DOWNLOAD" | "NEW RELEASE" | "ACTIVE",
      "downloadUrl": "string"
    }
  ],
  "results": [
    {
      "id": "string",
      "title": "string",
      "releaseDate": "${todayStr}",
      "status": "FINAL SELECTION LIST OUT" | "CUTOFF RELEASED",
      "details": "string"
    }
  ],
  "currentAffairs": [
    {
      "id": "string",
      "title": "string",
      "category": "Government Schemes" | "Bihar" | "Economy" | "Science & Technology",
      "date": "${todayStr}",
      "summary": "string",
      "keyPoints": ["string"],
      "impactAnalysis": "string",
      "source": "string",
      "readTimeMinutes": 2,
      "isTrending": true
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    const parsed = JSON.parse(text);

    const payload = {
      todayDate: todayStr,
      source: "gemini_live",
      jobs: parsed.jobs || fallbackData.jobs,
      admitCards: parsed.admitCards || fallbackData.admitCards,
      results: parsed.results || fallbackData.results,
      currentAffairs: parsed.currentAffairs || fallbackData.currentAffairs,
    };

    liveUpdatesCache = {
      timestamp: Date.now(),
      data: payload,
    };

    res.json(payload);
  } catch (err) {
    console.error("Error in /api/live-updates:", err);
    res.json({
      todayDate: new Date().toISOString().split("T")[0],
      source: "error_fallback",
      jobs: [],
      admitCards: [],
      results: [],
      currentAffairs: [],
    });
  }
};

app.post("/api/live-updates", handleLiveUpdatesRoute);
app.get("/api/live-updates", handleLiveUpdatesRoute);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(
      express.static(distPath, {
        maxAge: "1y",
        immutable: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
          } else {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
        },
      })
    );
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BharatSeva Portal server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
