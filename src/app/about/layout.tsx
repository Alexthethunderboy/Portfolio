import { Metadata } from 'next';
import { SHARE_IMAGE, SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Kelechi Alexander Ugoh, the creative technologist behind Thunderboy.',
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: 'About — Thunderboy', description: 'Meet Kelechi Alexander Ugoh, the creative technologist behind Thunderboy.',
    url: `${SITE.url}/about`, siteName: SITE.name, type: 'website', locale: 'en_NG',
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image', title: 'About — Thunderboy', description: 'Meet Kelechi Alexander Ugoh, the creative technologist behind Thunderboy.',
    images: [{ url: SHARE_IMAGE.url, alt: SHARE_IMAGE.alt }],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
