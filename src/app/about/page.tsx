import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";

const VALUES = [
  {
    title: "It should make sense.",
    body: "People should understand where they are, what they can do, and why it matters without working for it.",
  },
  {
    title: "It should feel considered.",
    body: "Type, spacing, colour, and motion should support the idea instead of fighting for attention.",
  },
  {
    title: "It should hold up.",
    body: "I care about accessible interfaces, maintainable code, good performance, and leaving a project easy to continue.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="surface-panel mx-auto grid max-w-6xl gap-7 sm:gap-10 rounded-[2rem] p-6 sm:rounded-[2.5rem] sm:p-10 lg:grid-cols-12 lg:items-center lg:p-12">
          <div className="lg:col-span-7">
            <p className="meta-label text-voltage">About me</p>
            <h1 className="display-heading mt-5 text-balance text-[clamp(2rem,8vw,2.75rem)] sm:text-[clamp(2.5rem,6vw,4.75rem)]">
              Kelechi Alexander Ugoh.
            </h1>
            <p className="mt-4 text-lg leading-7 text-voltage">Cybersecurity analyst focused on AppSec. Creative technologist.</p>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-7 text-white/[0.64] sm:text-lg sm:leading-8">
              <p>
                I build digital products and work across frontend engineering, visual identity and creative direction.
              </p>
              <p>
                I use React, Next.js and TypeScript. My cybersecurity focus is AppSec, which I develop through study and practical projects.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="relative mx-auto aspect-[4/4.5] sm:aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-white/[0.04]">
              <Image
                src="/assets/profile-pic.jpg"
                alt="Kelechi Alexander Ugoh"
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-carbon/55 to-transparent" />
            </div>
            <p className="mt-4 text-center text-sm text-white/65">{SITE.name} is the name I publish my work under.</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="site-shell">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="meta-label text-voltage">What matters to me</p>
            <h2 className="display-heading mt-4 text-[clamp(2.25rem,5vw,4rem)]">Good work feels clear.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {VALUES.map((value) => (
              <article key={value.title} className="surface-panel rounded-[1.75rem] p-6 sm:p-7">
                <h3 className="font-display text-3xl font-bold">{value.title}</h3>
                <p className="mt-4 leading-7 text-white/70">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 pt-12 md:pb-32 md:pt-20">
        <div className="site-shell">
          <div className="surface-panel grid gap-8 rounded-[2rem] p-6 sm:p-10 md:grid-cols-12 md:items-end md:p-12">
            <div className="md:col-span-8">
              <p className="meta-label text-voltage">Beyond the browser</p>
              <h2 className="display-heading mt-4 text-balance text-[clamp(2.25rem,5vw,4rem)]">
                I&apos;m curious about more than code.
              </h2>
              <p className="mt-6 max-w-2xl leading-7 text-white/60">
                Music, cinema, movement, plants, and African storytelling all find their way into how I notice rhythm, mood, and detail.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link href="/contact" className="button-primary">
                Say hello <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
