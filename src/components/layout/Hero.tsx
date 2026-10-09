import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";

export default function Hero() {
  return (
    <section className="px-4 pb-8 pt-28 text-center sm:px-6 sm:pt-36">
      <div className="cosmic-hero surface-panel mx-auto w-full max-w-5xl rounded-[2rem] px-5 py-8 sm:px-12 sm:py-14">
        <p className="meta-label text-voltage">Creative technologist</p>
        <h1 className="display-heading mx-auto mt-5 max-w-3xl text-balance text-[clamp(2rem,9vw,2.65rem)] sm:text-[clamp(2.6rem,7vw,5.5rem)]">Kelechi Alexander Ugoh.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">Design and code for digital products, visual identities, and creative ideas.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/projects" className="button-primary">See my work <ArrowDownRight aria-hidden="true" size={16} /></Link>
          <Link href="/about" className="button-secondary">More about me <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm text-white/70">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center px-3 font-bold hover:text-white">GitHub <span aria-hidden="true">↗</span></a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center px-3 font-bold hover:text-white">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
