import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[85svh] items-center px-4 pb-16 pt-28 text-center sm:px-6">
      <div className="glass-panel mx-auto w-full max-w-4xl rounded-[2rem] px-6 py-14 sm:px-10 sm:py-16">
          <p className="meta-label text-voltage">404</p>
          <h1 className="display-heading mt-5 text-balance text-[clamp(4rem,10vw,8rem)]">This page isn&apos;t here.</h1>
          <p className="mx-auto mb-8 mt-6 max-w-lg text-lg leading-8 text-white/60">
            The link may be old, or the page may have moved.
          </p>
          <Link href="/" className="button-primary">
            Go home <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
      </div>
    </section>
  );
}
