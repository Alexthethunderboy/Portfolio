import { Metadata } from 'next';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Products, experiments, and personal projects by cybersecurity analyst focused on AppSec and creative technologist Kelechi Alexander Ugoh.',
  alternates: { canonical: `${SITE.url}/projects` },
  openGraph: {
    title: 'Work — Thunderboy', description: 'Products, experiments, and personal projects by cybersecurity analyst focused on AppSec and creative technologist Kelechi Alexander Ugoh.',
    url: `${SITE.url}/projects`, siteName: SITE.name, type: 'website', locale: 'en_NG',
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, width: 1200, height: 630, type: 'image/png', alt: 'Thunderboy — Creative Technologist' }],
  },
  twitter: {
    card: 'summary_large_image', title: 'Work — Thunderboy', description: 'Products, experiments, and personal projects by cybersecurity analyst focused on AppSec and creative technologist Kelechi Alexander Ugoh.',
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, alt: 'Thunderboy — Creative Technologist' }],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
