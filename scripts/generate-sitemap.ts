import fs from 'fs';
import path from 'path';

// Import all portal and education datasets
import { initialCollegesData, initialUniversitiesData } from '../src/data/collegesUniversitiesData';
import { initialCoursesData } from '../src/data/coursesData';
import { initialAdmissionsData } from '../src/data/admissionsData';
import { examHubDataList } from '../src/data/examHubData';
import {
  initialServicesData,
  initialScholarshipsData,
  initialSchemesData,
  initialJobsData,
  initialExamsData,
} from '../src/data/portalData';
import {
  initialCMSJobs,
  initialCMSResults,
  initialCMSAdmitCards,
  initialCMSAnswerKeys,
} from '../src/data/cmsInitialData';
import { initialCurrentAffairsArticles } from '../src/data/currentAffairsData';
import { TRENDING_PUBLIC_TOOLS } from '../src/data/publicToolsData';
import {
  POPULAR_TOOLS_DATA,
  AI_UTILITIES_DATA,
  LATEST_ARTICLES_DATA,
} from '../src/data/bharatSevaToolsData';

// Import high-value commercial verticals
import {
  HIGH_RPM_ARTICLES_GUIDES,
  TOP_CREDIT_CARDS_DATA,
  TOP_LOANS_DATA,
  TOP_INSURANCE_DATA,
} from '../src/data/financeInsuranceData';
import {
  REAL_ESTATE_GUIDES,
  TOP_CITIES_REAL_ESTATE,
} from '../src/data/realEstateData';
import {
  TECH_GUIDES,
  TECH_SAAS_TOOLS,
} from '../src/data/techSaasData';
import {
  GOVT_BUSINESS_SCHEMES,
  TOP_BUSINESS_IDEAS,
} from '../src/data/businessData';
import {
  TOP_VEHICLES_DATA,
  PARIVAHAN_SERVICES,
} from '../src/data/automobilesData';
import {
  TOP_HOSPITALS_DATA,
  GENERIC_MEDICINES_DATA,
  SURGERY_COSTS_DATA,
} from '../src/data/healthData';
import {
  TOP_TRAVEL_DESTINATIONS,
  TRAVEL_SERVICES_GUIDES,
} from '../src/data/travelData';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  images?: { loc: string; title?: string }[];
  news?: {
    publicationName: string;
    publicationLanguage: string;
    publicationDate: string;
    title: string;
  };
}

const BASE_URL = process.env.SITE_URL || 'https://bharatseva.in';
const TODAY = new Date().toISOString().split('T')[0];

function cleanXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapXml(customBaseUrl: string = BASE_URL): {
  xml: string;
  totalUrls: number;
  breakdown: Record<string, number>;
} {
  const entries: SitemapEntry[] = [];
  const breakdown: Record<string, number> = {};

  const addEntry = (category: string, entry: SitemapEntry) => {
    // Avoid duplicates
    if (!entries.some(e => e.url === entry.url)) {
      entries.push(entry);
      breakdown[category] = (breakdown[category] || 0) + 1;
    }
  };

  // 1. Core Hubs and Primary Navigation Pages
  const coreHubs: { path: string; priority: string; changefreq: SitemapEntry['changefreq'] }[] = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'jobs', priority: '0.95', changefreq: 'daily' },
    { path: 'admit-cards', priority: '0.95', changefreq: 'daily' },
    { path: 'results', priority: '0.95', changefreq: 'daily' },
    { path: 'colleges', priority: '0.90', changefreq: 'weekly' },
    { path: 'universities', priority: '0.90', changefreq: 'weekly' },
    { path: 'admissions', priority: '0.90', changefreq: 'daily' },
    { path: 'courses', priority: '0.90', changefreq: 'weekly' },
    { path: 'finance-insurance', priority: '0.90', changefreq: 'daily' },
    { path: 'real-estate', priority: '0.85', changefreq: 'daily' },
    { path: 'tech-saas', priority: '0.85', changefreq: 'daily' },
    { path: 'business-hub', priority: '0.85', changefreq: 'daily' },
    { path: 'automobiles', priority: '0.85', changefreq: 'daily' },
    { path: 'health', priority: '0.85', changefreq: 'daily' },
    { path: 'travel', priority: '0.85', changefreq: 'daily' },
    { path: 'exams', priority: '0.85', changefreq: 'daily' },
    { path: 'scholarships', priority: '0.85', changefreq: 'weekly' },
    { path: 'schemes', priority: '0.85', changefreq: 'weekly' },
    { path: 'deadlines', priority: '0.85', changefreq: 'daily' },
    { path: 'current-affairs', priority: '0.80', changefreq: 'daily' },
    { path: 'services', priority: '0.80', changefreq: 'weekly' },
    { path: 'bharatseva-bihar', priority: '0.80', changefreq: 'weekly' },
    { path: 'tools', priority: '0.80', changefreq: 'weekly' },
    { path: 'ai-utilities', priority: '0.75', changefreq: 'weekly' },
    { path: 'search-intent-hub', priority: '0.75', changefreq: 'weekly' },
    { path: 'jobs-for-you', priority: '0.75', changefreq: 'daily' },
  ];

  coreHubs.forEach(hub => {
    const fullUrl = hub.path ? `${customBaseUrl}/${hub.path}` : `${customBaseUrl}/`;
    addEntry('Core Hubs & Navigation', {
      url: fullUrl,
      lastmod: TODAY,
      changefreq: hub.changefreq,
      priority: hub.priority,
    });
  });

  // 2. Govt Job Listings (CMS Jobs + Portal Jobs)
  const allJobsMap = new Map<string, any>();
  initialCMSJobs.forEach(job => allJobsMap.set(job.id, job));
  initialJobsData.forEach(job => {
    if (!allJobsMap.has(job.id)) {
      allJobsMap.set(job.id, job);
    }
  });

  allJobsMap.forEach(job => {
    const lastmodDate = job.updatedAt || job.startDate || TODAY;
    const url = `${customBaseUrl}/jobs/${encodeURIComponent(job.id)}`;
    const isHot = job.isHot || (job.vacancy && job.vacancy.includes('10,000'));
    addEntry('Govt Job Listings', {
      url,
      lastmod: lastmodDate,
      changefreq: 'daily',
      priority: isHot ? '0.90' : '0.85',
      images: job.pdfUrl
        ? [
            {
              loc: job.pdfUrl,
              title: `${job.title} Official Notification PDF`,
            },
          ]
        : undefined,
    });
  });

  // 3. Admit Cards & Hall Tickets
  initialCMSAdmitCards.forEach(ac => {
    const url = `${customBaseUrl}/admit-cards/${encodeURIComponent(ac.id)}`;
    addEntry('Admit Cards & Hall Tickets', {
      url,
      lastmod: TODAY,
      changefreq: 'daily',
      priority: '0.85',
    });
  });

  // 4. Results & Answer Keys
  initialCMSResults.forEach(res => {
    const url = `${customBaseUrl}/results/${encodeURIComponent(res.id)}`;
    addEntry('Results & Merit Lists', {
      url,
      lastmod: res.releaseDate ? TODAY : TODAY,
      changefreq: 'daily',
      priority: '0.85',
    });
  });

  initialCMSAnswerKeys.forEach(ak => {
    const url = `${customBaseUrl}/results/answer-key/${encodeURIComponent(ak.id)}`;
    addEntry('Answer Keys', {
      url,
      lastmod: TODAY,
      changefreq: 'daily',
      priority: '0.80',
    });
  });

  // 5. College Directory Pages
  initialCollegesData.forEach(college => {
    const identifier = college.slug || college.id;
    const url = `${customBaseUrl}/colleges/${encodeURIComponent(identifier)}`;
    const images: { loc: string; title?: string }[] = [];
    if (college.bannerUrl) images.push({ loc: college.bannerUrl, title: `${college.name} Campus Banner` });
    if (college.logoUrl) images.push({ loc: college.logoUrl, title: `${college.name} Official Emblem` });

    addEntry('Colleges Directory', {
      url,
      lastmod: college.lastVerifiedDate || TODAY,
      changefreq: 'weekly',
      priority: college.nirfRank && college.nirfRank <= 50 ? '0.90' : '0.85',
      images: images.length > 0 ? images : undefined,
    });
  });

  // 6. University Directory Pages
  initialUniversitiesData.forEach(university => {
    const identifier = university.slug || university.id;
    const url = `${customBaseUrl}/universities/${encodeURIComponent(identifier)}`;

    addEntry('Universities Directory', {
      url,
      lastmod: university.lastVerifiedDate || TODAY,
      changefreq: 'weekly',
      priority: university.nirfRank && university.nirfRank <= 50 ? '0.90' : '0.85',
    });
  });

  // 7. Higher Education Courses
  initialCoursesData.forEach(course => {
    const identifier = course.slug || course.id;
    const url = `${customBaseUrl}/courses/${encodeURIComponent(identifier)}`;
    addEntry('Courses Directory', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.85',
    });
  });

  // 8. Live College Admissions 2026
  initialAdmissionsData.forEach(adm => {
    const identifier = adm.slug || adm.id;
    const url = `${customBaseUrl}/admissions/${encodeURIComponent(identifier)}`;
    addEntry('Admissions 2026', {
      url,
      lastmod: adm.startDate || TODAY,
      changefreq: 'daily',
      priority: '0.85',
    });
  });

  // 9. Exam Lifecycle Hubs (BPSC, SSC CGL, UPSC, NEET, etc.)
  examHubDataList.forEach(hub => {
    const url = `${customBaseUrl}/exams/${encodeURIComponent(hub.id)}`;
    const images: { loc: string; title?: string }[] = [];
    if (hub.bannerImage) images.push({ loc: hub.bannerImage, title: `${hub.title} Lifecycle Guide` });

    addEntry('Exam Lifecycle Hubs', {
      url,
      lastmod: TODAY,
      changefreq: 'daily',
      priority: '0.90',
      images: images.length > 0 ? images : undefined,
    });
  });

  // 10. General Competitive Exams
  initialExamsData.forEach(ex => {
    const url = `${customBaseUrl}/exams/${encodeURIComponent(ex.id)}`;
    addEntry('Competitive Exams', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });

  // 11. Citizen Public Services & RTPS Certificates
  initialServicesData.forEach(service => {
    const url = `${customBaseUrl}/services/${encodeURIComponent(service.id)}`;
    addEntry('RTPS Citizen Services', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: service.popularity >= 95 ? '0.85' : '0.80',
    });
  });

  // 12. Scholarships & Grants
  initialScholarshipsData.forEach(sch => {
    const url = `${customBaseUrl}/scholarships/${encodeURIComponent(sch.id)}`;
    addEntry('Scholarships Directory', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.85',
    });
  });

  // 13. DBT Welfare Schemes
  initialSchemesData.forEach(scheme => {
    const url = `${customBaseUrl}/schemes/${encodeURIComponent(scheme.id)}`;
    addEntry('Welfare & DBT Schemes', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.85',
    });
  });

  // 14. Current Affairs & Daily Government Gazettes
  initialCurrentAffairsArticles.forEach(ca => {
    const url = `${customBaseUrl}/current-affairs/${encodeURIComponent(ca.id)}`;
    addEntry('Current Affairs & Gazettes', {
      url,
      lastmod: ca.date || TODAY,
      changefreq: 'daily',
      priority: ca.isTrending ? '0.85' : '0.75',
      news: {
        publicationName: 'BharatSeva Daily Gazette',
        publicationLanguage: 'en',
        publicationDate: ca.date || TODAY,
        title: ca.title,
      },
    });
  });

  // 15. Trending Public Tools & Interactive Calculators
  const toolIds = new Set<string>();
  TRENDING_PUBLIC_TOOLS.forEach(tool => {
    if (!toolIds.has(tool.id)) {
      toolIds.add(tool.id);
      const url = `${customBaseUrl}/tools/${encodeURIComponent(tool.id)}`;
      addEntry('Citizen Tools & Calculators', {
        url,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.80',
      });
    }
  });

  POPULAR_TOOLS_DATA.forEach(tool => {
    if (!toolIds.has(tool.id)) {
      toolIds.add(tool.id);
      const url = `${customBaseUrl}/tools/${encodeURIComponent(tool.id)}`;
      addEntry('Citizen Tools & Calculators', {
        url,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.80',
      });
    }
  });

  AI_UTILITIES_DATA.forEach(util => {
    const url = `${customBaseUrl}/ai-utilities/${encodeURIComponent(util.id)}`;
    addEntry('AI Citizen Utilities', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });

  // 16. Featured Articles & Explainer Guides
  LATEST_ARTICLES_DATA.forEach(art => {
    const url = `${customBaseUrl}/articles/${encodeURIComponent(art.id)}`;
    addEntry('Featured Articles & Guides', {
      url,
      lastmod: art.date || TODAY,
      changefreq: 'weekly',
      priority: '0.80',
      news: {
        publicationName: 'BharatSeva Editorial',
        publicationLanguage: 'en',
        publicationDate: art.date || TODAY,
        title: art.title,
      },
    });
  });

  // 17. Finance & Insurance Vertical Sub-Guides & Offers
  HIGH_RPM_ARTICLES_GUIDES.forEach(guide => {
    const url = `${customBaseUrl}/finance-insurance/guide/${encodeURIComponent(guide.id)}`;
    addEntry('Finance & Insurance Guides', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.85',
    });
  });
  TOP_CREDIT_CARDS_DATA.forEach(card => {
    const url = `${customBaseUrl}/finance-insurance/credit-card/${encodeURIComponent(card.id)}`;
    addEntry('Credit Cards Comparison', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });
  TOP_LOANS_DATA.forEach(loan => {
    const url = `${customBaseUrl}/finance-insurance/loan/${encodeURIComponent(loan.id)}`;
    addEntry('Loans Comparison', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });
  TOP_INSURANCE_DATA.forEach(ins => {
    const url = `${customBaseUrl}/finance-insurance/insurance/${encodeURIComponent(ins.id)}`;
    addEntry('Insurance Plans', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });

  // 18. Real Estate Property & Land Guides
  REAL_ESTATE_GUIDES.forEach(guide => {
    const url = `${customBaseUrl}/real-estate/guide/${encodeURIComponent(guide.id)}`;
    addEntry('Real Estate Guides', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });
  TOP_CITIES_REAL_ESTATE.forEach(city => {
    const citySlug = city.city.toLowerCase().replace(/\s+/g, '-');
    const url = `${customBaseUrl}/real-estate/city/${encodeURIComponent(citySlug)}`;
    addEntry('Real Estate City Rates', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });

  // 19. Tech & SaaS Software Directory
  TECH_GUIDES.forEach(guide => {
    const url = `${customBaseUrl}/tech-saas/guide/${encodeURIComponent(guide.id)}`;
    addEntry('Tech & SaaS Guides', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });
  TECH_SAAS_TOOLS.forEach(tool => {
    const url = `${customBaseUrl}/tech-saas/tool/${encodeURIComponent(tool.id)}`;
    addEntry('Tech & AI Software Tools', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });

  // 20. Business & MSME Schemes
  GOVT_BUSINESS_SCHEMES.forEach(scheme => {
    const url = `${customBaseUrl}/business-hub/scheme/${encodeURIComponent(scheme.id)}`;
    addEntry('MSME & Startup Schemes', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.85',
    });
  });
  TOP_BUSINESS_IDEAS.forEach(idea => {
    const url = `${customBaseUrl}/business-hub/idea/${encodeURIComponent(idea.id)}`;
    addEntry('Business Ideas & Project Reports', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });

  // 21. Automobiles & Parivahan Services
  TOP_VEHICLES_DATA.forEach(veh => {
    const url = `${customBaseUrl}/automobiles/vehicle/${encodeURIComponent(veh.id)}`;
    addEntry('Vehicle Reviews & Specs', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });
  PARIVAHAN_SERVICES.forEach(ps => {
    const serviceSlug = ps.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const url = `${customBaseUrl}/automobiles/service/${encodeURIComponent(serviceSlug)}`;
    addEntry('Parivahan RTO Services', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });

  // 22. Healthcare, PM-JAY Hospitals & Generic Medicines
  TOP_HOSPITALS_DATA.forEach(hosp => {
    const url = `${customBaseUrl}/health/hospital/${encodeURIComponent(hosp.id)}`;
    addEntry('Ayushman Hospitals', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });
  GENERIC_MEDICINES_DATA.forEach(med => {
    const medSlug = med.genericName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const url = `${customBaseUrl}/health/medicine/${encodeURIComponent(medSlug)}`;
    addEntry('Jan Aushadhi Generic Medicines', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });
  SURGERY_COSTS_DATA.forEach(surg => {
    const surgSlug = surg.procedureName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const url = `${customBaseUrl}/health/surgery/${encodeURIComponent(surgSlug)}`;
    addEntry('Surgery Cost Comparisons', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });

  // 23. Travel & Pilgrimage Circuits
  TOP_TRAVEL_DESTINATIONS.forEach(dest => {
    const url = `${customBaseUrl}/travel/destination/${encodeURIComponent(dest.id)}`;
    addEntry('Travel Destinations & Circuits', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });
  TRAVEL_SERVICES_GUIDES.forEach(svc => {
    const url = `${customBaseUrl}/travel/guide/${encodeURIComponent(svc.id)}`;
    addEntry('Travel & IRCTC Guides', {
      url,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });

  // Construct standard, clean XML string
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  entries.forEach(entry => {
    xml += `  <url>\n`;
    xml += `    <loc>${cleanXml(entry.url)}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;

    if (entry.images && entry.images.length > 0) {
      entry.images.forEach(img => {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${cleanXml(img.loc)}</image:loc>\n`;
        if (img.title) {
          xml += `      <image:title>${cleanXml(img.title)}</image:title>\n`;
        }
        xml += `    </image:image>\n`;
      });
    }

    if (entry.news) {
      xml += `    <news:news>\n`;
      xml += `      <news:publication>\n`;
      xml += `        <news:name>${cleanXml(entry.news.publicationName)}</news:name>\n`;
      xml += `        <news:language>${cleanXml(entry.news.publicationLanguage)}</news:language>\n`;
      xml += `      </news:publication>\n`;
      xml += `      <news:publication_date>${entry.news.publicationDate}</news:publication_date>\n`;
      xml += `      <news:title>${cleanXml(entry.news.title)}</news:title>\n`;
      xml += `    </news:news>\n`;
    }

    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  return {
    xml,
    totalUrls: entries.length,
    breakdown,
  };
}

// Standalone execution script
export function writeSitemapFiles(): void {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const distDir = path.join(rootDir, 'dist');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const { xml, totalUrls, breakdown } = generateSitemapXml();

  // Write public/sitemap.xml
  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml, 'utf8');

  // If dist exists, also write dist/sitemap.xml for production builds
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xml, 'utf8');
  }

  // Generate robots.txt
  const robotsTxt = `# BharatSeva Citizen Portal Robots.txt
# High-speed search engine indexing for Googlebot, Bingbot, and web crawlers

User-agent: *
Allow: /
Allow: /api/live-updates
Allow: /api/chat

# Host & Sitemap Directives
Host: ${BASE_URL.replace(/^https?:\/\//, '')}
Sitemap: ${BASE_URL}/sitemap.xml
`;

  const publicRobotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(publicRobotsPath, robotsTxt, 'utf8');

  if (fs.existsSync(distDir)) {
    const distRobotsPath = path.join(distDir, 'robots.txt');
    fs.writeFileSync(distRobotsPath, robotsTxt, 'utf8');
  }

  console.log('--------------------------------------------------');
  console.log('✅ BharatSeva Sitemap & Robots.txt Generated Successfully!');
  console.log(`🌐 Total Indexed URLs: ${totalUrls}`);
  console.log('📊 Category Breakdown:');
  Object.entries(breakdown).forEach(([cat, count]) => {
    console.log(`   • ${cat.padEnd(35, ' ')} : ${count} URLs`);
  });
  console.log(`📁 File written to: ${publicSitemapPath}`);
  console.log(`📁 Robots written to: ${publicRobotsPath}`);
  console.log('--------------------------------------------------');
}

// If invoked directly from CLI (e.g. tsx scripts/generate-sitemap.ts)
if (process.argv[1] && process.argv[1].endsWith('generate-sitemap.ts')) {
  writeSitemapFiles();
}
