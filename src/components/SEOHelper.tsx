import React, { useEffect, useState } from 'react';
import {
  Code,
  Globe,
  FileCode,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Download,
  Eye,
  X,
  Layers,
  Sparkles,
  Search,
} from 'lucide-react';
import { SEOPageMeta } from '../types';

interface SEOHelperProps {
  meta: SEOPageMeta;
  onNavigateTab?: (tabId: string) => void;
}

export const SEOHelper: React.FC<SEOHelperProps> = ({ meta, onNavigateTab }) => {
  const [showInspector, setShowInspector] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);

  // Dynamic Head Injections
  useEffect(() => {
    if (meta.title) {
      document.title = meta.title;
    }

    // Update Meta Description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', meta.description || 'BharatSeva - Comprehensive Citizen & Higher Education Information Portal.');

    // Update Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('content', meta.canonicalUrl || window.location.href);

    // Dynamic JSON-LD Injection
    const existingScript = document.getElementById('bharatseva-dynamic-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (meta.structuredData || meta.faqSchema) {
      const script = document.createElement('script');
      script.id = 'bharatseva-dynamic-jsonld';
      script.type = 'application/ld+json';

      const schemas: any[] = [];

      if (meta.structuredData) {
        schemas.push(meta.structuredData);
      }

      if (meta.faqSchema && meta.faqSchema.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: meta.faqSchema.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        });
      }

      script.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
      document.head.appendChild(script);
    }
  }, [meta]);

  // Generate XML Sitemap string
  const generateSitemapXml = () => {
    const urls = [
      { loc: 'https://bharatseva.in/', priority: '1.0', changefreq: 'daily' },
      { loc: 'https://bharatseva.in/admissions', priority: '0.9', changefreq: 'daily' },
      { loc: 'https://bharatseva.in/courses', priority: '0.9', changefreq: 'weekly' },
      { loc: 'https://bharatseva.in/colleges', priority: '0.9', changefreq: 'weekly' },
      { loc: 'https://bharatseva.in/universities', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://bharatseva.in/current-affairs', priority: '0.8', changefreq: 'daily' },
      { loc: 'https://bharatseva.in/jobs', priority: '0.9', changefreq: 'daily' },
      { loc: 'https://bharatseva.in/bihar-hub', priority: '0.9', changefreq: 'daily' },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    urls.forEach((u) => {
      xml += `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;
    return xml;
  };

  return (
    <div className="w-full bg-slate-900 text-slate-100 border-t border-slate-800 pt-6 pb-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Breadcrumb Navigation Component */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-3.5 px-5 rounded-2xl border border-slate-800 text-xs">
          <nav className="flex flex-wrap items-center gap-1.5 font-semibold text-slate-300">
            {meta.breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
                {idx === meta.breadcrumbs.length - 1 ? (
                  <span className="text-amber-400 font-bold truncate max-w-[200px] sm:max-w-xs">{crumb.label}</span>
                ) : (
                  <a href={crumb.url} className="hover:text-white transition-colors">
                    {crumb.label}
                  </a>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInspector(true)}
              className="bg-indigo-600/80 hover:bg-indigo-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-indigo-500/40 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
              <span>SEO Schema Inspector</span>
            </button>

            <button
              onClick={() => setShowSitemap(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>XML Sitemap</span>
            </button>
          </div>
        </div>

        {/* SEO Page Info Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-bold uppercase text-[10px] block mb-1">Generated SEO Title</span>
            <strong className="text-white font-bold text-sm block leading-snug">{meta.title}</strong>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-bold uppercase text-[10px] block mb-1">Meta Description</span>
            <p className="text-slate-300 line-clamp-2 leading-relaxed">{meta.description}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-bold uppercase text-[10px] block mb-1">Canonical URL</span>
            <span className="text-amber-300 font-mono text-[11px] truncate block">{meta.canonicalUrl}</span>
          </div>
        </div>

        {/* Contextual Internal Links Section */}
        {meta.internalLinks && meta.internalLinks.length > 0 && (
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Related Internal Directory Links</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {meta.internalLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => onNavigateTab?.(link.url.replace('#', ''))}
                  className="bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-white border border-slate-800 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* SEO Schema Inspector Modal */}
      {showInspector && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md overflow-y-auto flex justify-center p-4">
          <div className="bg-slate-950 text-white w-full max-w-3xl rounded-2xl border border-slate-800 p-6 my-auto shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-black text-amber-400 text-base">
                <Code className="w-5 h-5 text-indigo-400" />
                <span>JSON-LD Schema & Meta Audit</span>
              </div>
              <button onClick={() => setShowInspector(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-bold block mb-1">Target H1 Tag:</span>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-white font-bold text-sm">
                  {meta.h1}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">JSON-LD Schema Script Tag:</span>
                <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs overflow-x-auto font-mono border border-slate-800">
                  {JSON.stringify(meta.structuredData || meta.faqSchema || {}, null, 2)}
                </pre>
              </div>
            </div>

            <button
              onClick={() => setShowInspector(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

      {/* XML Sitemap Modal */}
      {showSitemap && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md overflow-y-auto flex justify-center p-4">
          <div className="bg-slate-950 text-white w-full max-w-3xl rounded-2xl border border-slate-800 p-6 my-auto shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-black text-amber-400 text-base">
                <FileCode className="w-5 h-5 text-indigo-400" />
                <span>BharatSeva XML Sitemap Generator</span>
              </div>
              <button onClick={() => setShowSitemap(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="bg-slate-900 text-amber-300 p-4 rounded-xl text-xs overflow-x-auto font-mono border border-slate-800 max-h-[350px]">
              {generateSitemapXml()}
            </pre>

            <button
              onClick={() => setShowSitemap(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
            >
              Close Sitemap
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
