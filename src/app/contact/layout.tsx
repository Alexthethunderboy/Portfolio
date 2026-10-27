import { Metadata } from 'next';
import { SHARE_IMAGE, SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact creative technologist Kelechi Alexander Ugoh about a project, idea, or collaboration.',
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: 'Contact — Thunderboy', description: 'Contact creative technologist Kelechi Alexander Ugoh about a project, idea, or collaboration.',
    url: `${SITE.url}/contact`, siteName: SITE.name, type: 'website', locale: 'en_NG',
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image', title: 'Contact — Thunderboy', description: 'Contact creative technologist Kelechi Alexander Ugoh about a project, idea, or collaboration.',
    images: [{ url: SHARE_IMAGE.url, alt: SHARE_IMAGE.alt }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
