import React, { useEffect } from 'react';
import { SEOPageMeta } from '../types';

interface SEOHelperProps {
  meta: SEOPageMeta;
  onNavigateTab?: (tabId: string) => void;
}

/**
 * Headless SEO Component that dynamically updates document.title, meta tags,
 * canonical links, and injects dynamic JSON-LD schema into the head.
 * Does not render visual markup on the user's screen.
 */
export const SEOHelper: React.FC<SEOHelperProps> = ({ meta }) => {
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
    descriptionMeta.setAttribute(
      'content',
      meta.description || 'BharatSeva - Comprehensive Citizen & Higher Education Information Portal.'
    );

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

  // Headless execution only
  return null;
};
