import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Kelechi Alexander Ugoh',
  description: 'Engineering digital experiences with precision and intent. Learn about my philosophy and tech stack.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
