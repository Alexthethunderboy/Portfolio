import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CosmicBackground from "@/components/layout/CosmicBackground";
import { SHARE_IMAGE, SITE } from "@/data/site";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const leagueSpartan = localFont({
  src: "../fonts/LeagueSpartan-wght.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-display",
  fallback: ["Arial Black", "Arial", "sans-serif"],
});

const plexMono = localFont({
  src: [
    { path: "../fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-mono",
  fallback: ["Menlo", "Consolas", "monospace"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.descriptor}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: SITE.url },
  authors: [{ name: SITE.founder, url: SITE.url }],
  creator: SITE.founder,
  keywords: [
    "Thunderboy",
    "Kelechi Alexander Ugoh",
    "Alex",
    "creative technologist",
    "creative direction",
    "visual identity",
    "front-end engineering",
    "design engineering",
    "digital product",
    "Next.js developer",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.descriptor}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [SHARE_IMAGE],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.descriptor}`,
    description: SITE.description,
    images: [{ url: SHARE_IMAGE.url, alt: SHARE_IMAGE.alt }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.founder,
  alternateName: [SITE.preferredName, SITE.name],
  url: SITE.url,
  description: SITE.description,
  email: `mailto:${SITE.email}`,
  jobTitle: SITE.descriptor,
  sameAs: [SITE.github, SITE.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${plexMono.variable}`}>
      <body className="atmosphere">
        <CosmicBackground />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          theme="dark"
          toastClassName="!rounded-2xl !border !border-white/[0.15] !bg-carbon !font-body !text-white"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
