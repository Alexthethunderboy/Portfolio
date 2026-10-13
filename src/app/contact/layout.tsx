import { Metadata } from 'next';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: SITE.description,
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: 'Contact — Thunderboy', description: SITE.description,
    url: `${SITE.url}/contact`, siteName: SITE.name, type: 'website', locale: 'en_NG',
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, width: 1200, height: 630, type: 'image/png', alt: SITE.socialImageAlt }],
  },
  twitter: {
    card: 'summary_large_image', title: 'Contact — Thunderboy', description: SITE.description,
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, alt: SITE.socialImageAlt }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
