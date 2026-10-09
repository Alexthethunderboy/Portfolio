import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Kelechi Alexander Ugoh, the creative technologist behind Thunderboy.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
