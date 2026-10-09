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
    default: `${SITE.preferredName} — ${SITE.descriptor}`,
    template: `%s — ${SITE.preferredName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
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
    title: `${SITE.preferredName} — ${SITE.descriptor}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: "/brand/logos/thunderboy-avatar-black-on-yellow.png",
        width: 1080,
        height: 1080,
        alt: "Thunderboy Junction mark on Voltage Yellow",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE.preferredName} — ${SITE.descriptor}`,
    description: SITE.description,
    images: ["/brand/logos/thunderboy-avatar-black-on-yellow.png"],
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
