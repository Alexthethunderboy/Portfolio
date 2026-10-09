import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="px-4 pb-5 pt-10 sm:px-6">
      <div className="glass-panel mx-auto max-w-6xl rounded-[2rem] px-6 py-9 sm:px-10 sm:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" aria-label="Thunderboy home" className="inline-flex min-h-11 items-center">
              <Image
                src="/brand/logos/thunderboy-wordmark-white.svg"
                alt="Thunderboy"
                width={220}
                height={44}
                className="h-auto w-[170px]"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-1 text-sm sm:flex-row sm:gap-6">
            <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center gap-2 font-bold text-white/75 hover:text-white">
              Email me
            </a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-bold text-white/75 hover:text-white">
              GitHub <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-bold text-white/75 hover:text-white">
              LinkedIn <ArrowUpRight aria-hidden="true" size={18} className="shrink-0" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Thunderboy</p>
          <p>Designed and built by {SITE.founder}.</p>
        </div>
      </div>
    </footer>
  );
}
