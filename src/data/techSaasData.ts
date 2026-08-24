export interface TechToolItem {
  id: string;
  name: string;
  category: 'AI Tools & LLMs' | 'Cloud & Web Hosting' | 'VPN & Cybersecurity' | 'Productivity & Office' | 'Developer & Design';
  pricingType: 'Free Tier Available' | 'Freemium' | 'Paid' | 'Open Source';
  startingPrice: string;
  rating: number;
  description: string;
  bestFor: string;
  features: string[];
  officialUrl: string;
  badge?: string;
}

export interface TechBuyingGuide {
  id: string;
  title: string;
  category: 'Hosting & Domains' | 'AI Tools Comparison' | 'AI Tools & LLMs' | 'VPN Security' | 'Software Licensing';
  readTime: string;
  summary: string;
  keyPoints: string[];
  recommendation: string;
}

export const TECH_SAAS_TOOLS: TechToolItem[] = [
  // 🤖 AI Tools
  {
    id: 'chatgpt-openai',
    name: 'ChatGPT (OpenAI GPT-4o / o1)',
    category: 'AI Tools & LLMs',
    pricingType: 'Freemium',
    startingPrice: 'Free / $20 per month (Plus)',
    rating: 4.9,
    description: 'Leading conversational AI model with real-time web browsing, data analysis, voice conversation, DALL-E 3 image generation, and custom GPTs.',
    bestFor: 'Writing, content generation, coding assistance, research & structured data analysis.',
    features: ['GPT-4o Multimodal reasoning', 'Canvas interactive writing & coding', 'Custom GPT creation', 'Advanced Data Analysis (Python execution)'],
    officialUrl: 'https://chatgpt.com',
    badge: 'Industry Standard',
  },
  {
    id: 'google-gemini-ai',
    name: 'Google Gemini (1.5 Pro & Flash)',
    category: 'AI Tools & LLMs',
    pricingType: 'Freemium',
    startingPrice: 'Free / ₹1,950 per mo (Google One AI Premium)',
    rating: 4.8,
    description: 'Google’s next-generation multimodal model with massive 2 Million token context window, deep integration with Google Workspace, Docs, Drive, and YouTube.',
    bestFor: 'Analyzing giant PDFs, video files, codebases, and seamless Google ecosystem integration.',
    features: ['2M token context window', 'Native Workspace & Gmail integration', 'Google search grounding', 'YouTube video analysis'],
    officialUrl: 'https://gemini.google.com',
    badge: 'Largest Context Window',
  },
  {
    id: 'claude-anthropic',
    name: 'Claude 3.5 Sonnet (Anthropic)',
    category: 'AI Tools & LLMs',
    pricingType: 'Freemium',
    startingPrice: 'Free / $20 per month (Pro)',
    rating: 4.9,
    description: 'Benchmark-leading AI model renowned for nuanced writing, exceptional coding performance, and interactive Artifacts live preview.',
    bestFor: 'Complex software engineering, creative writing, nuanced long-form analysis.',
    features: ['Interactive Artifacts UI', 'Superior coding & debugging benchmark', 'Human-like tone & safety', 'Vision analysis'],
    officialUrl: 'https://claude.ai',
    badge: 'Top Coder Choice',
  },
  {
    id: 'cursor-ai-ide',
    name: 'Cursor AI Code Editor',
    category: 'Developer & Design',
    pricingType: 'Freemium',
    startingPrice: 'Free / $20 per month (Pro)',
    rating: 4.9,
    description: 'AI-first code editor built as a fork of VS Code with codebase indexing, multi-file edits, and instant terminal command execution.',
    bestFor: 'Full-stack developers, rapid software engineering, refactoring.',
    features: ['Full codebase indexing & retrieval', 'Multi-file edits (Composer)', 'Instant diff review', 'Terminal AI integration'],
    officialUrl: 'https://cursor.com',
    badge: 'Trending Developer Tool',
  },
  {
    id: 'canva-pro-design',
    name: 'Canva Pro & Magic Studio',
    category: 'Developer & Design',
    pricingType: 'Freemium',
    startingPrice: 'Free / ₹3,999 per year',
    rating: 4.8,
    description: 'All-in-one graphic design and visual suite with AI Magic Eraser, background remover, social media templates, and video editing.',
    bestFor: 'Social media creators, marketing teams, educators, students.',
    features: ['Magic AI Design generation', '100M+ stock photos and graphics', '1-click brand kits and resize', 'Team collaboration'],
    officialUrl: 'https://canva.com',
    badge: 'Best for Design',
  },

  // 🌐 Hosting & Cloud
  {
    id: 'hostinger-web-hosting',
    name: 'Hostinger Cloud & Web Hosting',
    category: 'Cloud & Web Hosting',
    pricingType: 'Paid',
    startingPrice: '₹149 / month (Free Domain + SSL)',
    rating: 4.7,
    description: 'Fast LiteSpeed web hosting with free domain name, automated daily backups, free SSL certificates, and 1-click WordPress installation.',
    bestFor: 'Beginners, bloggers, small business websites, eCommerce stores.',
    features: ['LiteSpeed Web Server acceleration', 'Free domain name (1st year)', 'Free CDN & automated SSL', 'hPanel intuitive management'],
    officialUrl: 'https://www.hostinger.in',
    badge: 'Best Value Hosting',
  },
  {
    id: 'cloudflare-cdn-security',
    name: 'Cloudflare CDN, DNS & Zero Trust',
    category: 'Cloud & Web Hosting',
    pricingType: 'Free Tier Available',
    startingPrice: 'Free / $20 per month (Pro)',
    rating: 4.9,
    description: 'Global content delivery network (CDN), ultrafast 1.1.1.1 DNS, automated DDoS protection, and SSL encryption for websites.',
    bestFor: 'Website speed optimization, security hardening, bot protection.',
    features: ['Global Anycast CDN in 330+ cities', 'Unmetered DDoS mitigation', 'Free Universal SSL certificate', 'Edge serverless workers'],
    officialUrl: 'https://cloudflare.com',
    badge: 'Must-Have Web Security',
  },

  // 🛡️ VPN & Security
  {
    id: 'nordvpn-security',
    name: 'NordVPN Privacy Suite',
    category: 'VPN & Cybersecurity',
    pricingType: 'Paid',
    startingPrice: '₹280 / month (with 30-day money-back guarantee)',
    rating: 4.8,
    description: 'Top-rated virtual private network with Threat Protection, malware blocker, Double VPN encryption, and 6,000+ ultra-fast global servers.',
    bestFor: 'Public Wi-Fi privacy, secure streaming, bypassing regional geoblocks.',
    features: ['Strict verified No-Logs policy', 'NordLynx high-speed WireGuard protocol', 'Dark web monitor & ad blocker', '6 simultaneous device connections'],
    officialUrl: 'https://nordvpn.com',
    badge: 'Top VPN for Speed & Security',
  },
  {
    id: 'protonvpn-free-privacy',
    name: 'ProtonVPN (Unlimited Free Tier)',
    category: 'VPN & Cybersecurity',
    pricingType: 'Free Tier Available',
    startingPrice: 'Free / €4.99 per month (Plus)',
    rating: 4.7,
    description: 'Swiss-based open source VPN with strict privacy laws, zero logs, and unlimited free data bandwidth without ads.',
    bestFor: 'Journalists, privacy advocates, secure everyday browsing.',
    features: ['Unlimited free bandwidth', 'Swiss privacy jurisdiction', 'Open-source and audited apps', 'NetShield ad/tracker blocker'],
    officialUrl: 'https://protonvpn.com',
    badge: 'Best Free VPN',
  },

  // 📊 Productivity & SaaS
  {
    id: 'notion-workspace',
    name: 'Notion AI Workspace & Docs',
    category: 'Productivity & Office',
    pricingType: 'Freemium',
    startingPrice: 'Free / $10 per month (Plus)',
    rating: 4.8,
    description: 'Unified workspace for notes, project management, wikis, databases, and AI-powered writing assistance.',
    bestFor: 'Personal organization, startups, engineering teams, student notes.',
    features: ['Relational databases & Kanban boards', 'Notion AI autofill & summarization', 'Template gallery (10,000+ templates)', 'Unlimited page sharing'],
    officialUrl: 'https://notion.so',
    badge: 'Ultimate Workspace',
  },
];

export const TECH_GUIDES: TechBuyingGuide[] = [
  {
    id: 'web-hosting-india-guide',
    title: 'How to Choose the Best Web Hosting in India 2026: Shared vs VPS vs Cloud',
    category: 'Hosting & Domains',
    readTime: '6 min read',
    summary: 'A comprehensive technical and financial comparison of Indian data center servers, LiteSpeed vs Apache, SSD vs NVMe storage, and uptime benchmarks.',
    keyPoints: [
      'Choose hosting with servers located in Mumbai or Hyderabad for sub-30ms latency across India.',
      'Prefer LiteSpeed Web Server (LSWS) with LSCache over legacy Apache for 3x faster page speed.',
      'Ensure free SSL, automated daily backups, and at least 99.9% uptime SLA are included.',
      'For high-traffic portals (>100k visitors/mo), choose managed Cloud VPS or AWS/DigitalOcean droplets.',
    ],
    recommendation: 'For blogs and portfolio websites, Hostinger or Bluehost is recommended. For high-scale apps, DigitalOcean or AWS Lightsail.',
  },
  {
    id: 'ai-tools-productivity-stack',
    title: 'The Ultimate AI Tool Stack: ChatGPT vs Claude vs Gemini in 2026',
    category: 'AI Tools & LLMs',
    readTime: '5 min read',
    summary: 'When to use which AI: ChatGPT for everyday versatility and data plugins, Claude 3.5 for precision coding and long documents, and Gemini for Google Docs integration.',
    keyPoints: [
      'Coding & Programming: Claude 3.5 Sonnet and Cursor AI lead industry benchmarks.',
      'Data Analysis & Voice Mode: ChatGPT Plus offers the smoothest conversational experience.',
      'Video & Huge PDF Analysis: Google Gemini 1.5 Pro with 2M token context handles book-length documents effortlessly.',
      'Image & Vector Design: Midjourney v6 and Canva Magic Studio produce production-ready visuals.',
    ],
    recommendation: 'Combine Claude 3.5 Sonnet for development and ChatGPT for versatile workflow automation.',
  },
];
