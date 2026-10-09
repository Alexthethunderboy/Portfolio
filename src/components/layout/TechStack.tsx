const CAPABILITIES = [
  {
    title: "Digital products",
    description: "Shaping the idea, experience, interface, and working product.",
  },
  {
    title: "Creative technology",
    description: "Interactive experiments and prototypes that connect concept with technology.",
  },
  {
    title: "Visual identity",
    description: "Identity systems and digital expression built around a clear idea.",
  },
  {
    title: "Engineering",
    description: "Accessible, maintainable implementation for the web.",
  },
] as const;

const TECHNOLOGIES = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Sanity",
] as const;

export default function TechStack() {
  return (
    <section aria-labelledby="capabilities-heading" className="pb-24 pt-8 md:pb-32">
      <div className="site-shell">
        <div className="surface-panel grid gap-8 sm:gap-12 rounded-[2rem] p-6 sm:p-7 sm:p-10 md:grid-cols-12 md:p-12">
          <div className="md:col-span-5">
            <p className="meta-label text-voltage">What I do</p>
            <h2 id="capabilities-heading" className="display-heading mt-4 text-[clamp(2.25rem,5vw,4rem)]">
              Across disciplines.
            </h2>
            <p className="mt-6 max-w-md leading-7 text-white/60">
              My work can begin with a concept and continue through identity, interface, prototype, and production.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Current toolkit">
              {TECHNOLOGIES.map((technology) => (
                <li key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70">
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            {CAPABILITIES.map((capability) => (
              <article key={capability.title} className="border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0">
                <h3 className="font-display text-2xl font-bold">{capability.title}</h3>
                <p className="mt-2 leading-7 text-white/70">{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
