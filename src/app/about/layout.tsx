import { Metadata } from 'next';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Kelechi Alexander Ugoh, the creative technologist behind Thunderboy.',
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: 'About — Thunderboy', description: 'Meet Kelechi Alexander Ugoh, the creative technologist behind Thunderboy.',
    url: `${SITE.url}/about`, siteName: SITE.name, type: 'website', locale: 'en_NG',
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, width: 1200, height: 630, type: 'image/png', alt: 'Thunderboy — Creative Technologist' }],
  },
  twitter: {
    card: 'summary_large_image', title: 'About — Thunderboy', description: 'Meet Kelechi Alexander Ugoh, the creative technologist behind Thunderboy.',
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, alt: 'Thunderboy — Creative Technologist' }],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
