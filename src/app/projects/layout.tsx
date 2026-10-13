import { Metadata } from 'next';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Work',
  description: SITE.description,
  alternates: { canonical: `${SITE.url}/projects` },
  openGraph: {
    title: 'Work — Thunderboy', description: SITE.description,
    url: `${SITE.url}/projects`, siteName: SITE.name, type: 'website', locale: 'en_NG',
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, width: 1200, height: 630, type: 'image/png', alt: SITE.socialImageAlt }],
  },
  twitter: {
    card: 'summary_large_image', title: 'Work — Thunderboy', description: SITE.description,
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, alt: SITE.socialImageAlt }],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
