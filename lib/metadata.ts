import type { Metadata } from 'next';
import { siteConfig } from './site-config';

export function buildMetadata(
  title?: string,
  description?: string,
  path = '/'
): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.siteTitle}` : siteConfig.ogTitle;
  const metaDescription = description || siteConfig.ogDescription;
  const baseUrl = siteConfig.canonicalUrl.replace(/\/$/, '');
  const canonical = path === '/' ? baseUrl : `${baseUrl}${path}`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: siteConfig.keywords,
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: siteConfig.siteTitle,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
  };
}
