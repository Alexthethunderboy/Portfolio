import { Metadata } from 'next';
import { SHARE_IMAGE, SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Products, experiments, and personal projects by creative technologist Kelechi Alexander Ugoh.',
  alternates: { canonical: `${SITE.url}/projects` },
  openGraph: {
    title: 'Work — Thunderboy', description: 'Products, experiments, and personal projects by creative technologist Kelechi Alexander Ugoh.',
    url: `${SITE.url}/projects`, siteName: SITE.name, type: 'website', locale: 'en_NG',
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image', title: 'Work — Thunderboy', description: 'Products, experiments, and personal projects by creative technologist Kelechi Alexander Ugoh.',
    images: [{ url: SHARE_IMAGE.url, alt: SHARE_IMAGE.alt }],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
