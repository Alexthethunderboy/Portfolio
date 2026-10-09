export const metadata = {
  title: "Sanity Studio",
  description: "Sanity Studio for the portfolio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
