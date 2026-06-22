import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work | Kelechi Alexander Ugoh',
  description: 'Selected projects and case studies showcasing performance, accessibility, and robust engineering.',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
