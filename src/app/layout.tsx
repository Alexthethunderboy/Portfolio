import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CosmicBackground from "@/components/layout/CosmicBackground";
import { SITE } from "@/data/site";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    "cybersecurity analyst",
    "application security",
    "AppSec",
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
    images: [
      {
        url: `${SITE.url}/brand/social/thunderboy-share.png`,
        width: 1200,
        height: 630,
        alt: "Thunderboy — Creative Technologist. Digital products, visual identity & code.",
        type: "image/png",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.descriptor}`,
    description: SITE.description,
    images: [{ url: `${SITE.url}/brand/social/thunderboy-share.png`, alt: "Thunderboy — Creative Technologist" }],
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
    <html lang="en">
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
