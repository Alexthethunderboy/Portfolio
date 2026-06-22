import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Kelechi Alexander Ugoh',
  description: 'Let\'s build something extraordinary. Get in touch to discuss engineering trends or projects.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
