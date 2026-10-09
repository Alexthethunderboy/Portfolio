import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Products, experiments, and personal projects by creative technologist Kelechi Alexander Ugoh.',
  alternates: { canonical: '/projects' },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
