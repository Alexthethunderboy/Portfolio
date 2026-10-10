import { Metadata } from 'next';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact cybersecurity analyst focused on AppSec and creative technologist Kelechi Alexander Ugoh about a project, idea, or collaboration.',
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: 'Contact — Thunderboy', description: 'Contact cybersecurity analyst focused on AppSec and creative technologist Kelechi Alexander Ugoh about a project, idea, or collaboration.',
    url: `${SITE.url}/contact`, siteName: SITE.name, type: 'website', locale: 'en_NG',
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, width: 1200, height: 630, type: 'image/png', alt: 'Thunderboy — Creative Technologist' }],
  },
  twitter: {
    card: 'summary_large_image', title: 'Contact — Thunderboy', description: 'Contact cybersecurity analyst focused on AppSec and creative technologist Kelechi Alexander Ugoh about a project, idea, or collaboration.',
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, alt: 'Thunderboy — Creative Technologist' }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
