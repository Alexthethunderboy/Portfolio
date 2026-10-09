"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Send } from "lucide-react";
import { SITE } from "@/data/site";
import { createEmailDraft } from "@/lib/email-draft";

export default function ContactPage() {
  const [draftOpened, setDraftOpened] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const draft = createEmailDraft({
      name: String(fields.get("user_name") ?? ""),
      email: String(fields.get("user_email") ?? ""),
      message: String(fields.get("message") ?? ""),
    });
    setDraftOpened(true);
    window.location.href = draft;
  }

  return (
    <section className="px-4 pb-24 pt-28 sm:px-6 sm:pt-32 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-8 max-w-3xl sm:mb-12 text-center">
          <p className="meta-label text-voltage">Contact</p>
          <h1 className="display-heading mt-5 text-balance text-[clamp(2.75rem,7vw,5.5rem)]">Let&apos;s talk.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Tell me what you&apos;re working on, what you need help with, or simply send a hello.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <aside className="surface-panel min-w-0 rounded-[2rem] p-6 sm:p-9 lg:col-span-4">
            <p className="text-sm text-white/65">Email me directly</p>
            <a
              href={`mailto:${SITE.email}`}
              aria-label={SITE.email}
              className="mt-4 block min-h-11 [overflow-wrap:anywhere] font-display text-[clamp(1.35rem,4vw,1.65rem)] font-bold leading-tight text-white hover:text-voltage"
            >
              {SITE.email.split("@")[0]}<wbr />@{SITE.email.split("@")[1]}
            </a>
            <p className="mt-6 leading-7 text-white/70">
              Email is best if you already have a brief, references, or a few links to share.
            </p>

            <div className="mt-10 hidden border-t border-white/10 pt-6 lg:block">
              <p className="text-sm text-white/65">Elsewhere</p>
              <div className="mt-4 flex flex-col items-start gap-4">
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 font-bold text-white/[0.72] hover:text-white">
                  <Github aria-hidden="true" size={18} /> GitHub <ArrowUpRight aria-hidden="true" size={14} />
                </a>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 font-bold text-white/[0.72] hover:text-white">
                  <Linkedin aria-hidden="true" size={18} /> LinkedIn <ArrowUpRight aria-hidden="true" size={14} />
                </a>
              </div>
            </div>
          </aside>

          <div className="surface-panel min-w-0 rounded-[2rem] p-6 sm:p-9 lg:col-span-8 lg:p-10">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Prepare an email</h2>
            <p className="mt-3 leading-7 text-white/70">This opens a draft in your email app. Review it and press Send there; this website does not send your message.</p>

            <form className="mt-7 sm:mt-9" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-white/70">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="user_name"
                    type="text"
                    autoComplete="name"
                    required
                    className="min-h-14 min-w-0 w-full rounded-2xl border border-white/40 bg-white/[0.05] px-4 text-white text-base outline-none transition-colors placeholder:text-white/65 focus:border-voltage"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-white/70">
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    name="user_email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    className="min-h-14 min-w-0 w-full rounded-2xl border border-white/40 bg-white/[0.05] px-4 text-white text-base outline-none transition-colors placeholder:text-white/65 focus:border-voltage"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-white/70">
                  What&apos;s on your mind?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={7}
                  required
                  placeholder="Tell me about the idea, the problem, or the kind of help you need."
                  className="min-w-0 w-full resize-y rounded-2xl border border-white/40 bg-white/[0.05] px-4 py-4 text-white text-base outline-none transition-colors placeholder:text-white/65 focus:border-voltage"
                />
              </div>

              <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm leading-6 text-white/[0.65]">
                  Your details stay on this page until you open your email app.
                </p>
                <button type="submit" className="button-primary shrink-0">
                  Open email draft
                  <Send aria-hidden="true" size={16} />
                </button>
              </div>

              {draftOpened && (
                <p role="status" aria-live="polite" className="mt-6 rounded-xl border border-white/40 px-4 py-3 text-sm leading-6 text-white/80">
                  Your email app was requested. Nothing has been sent by this website, and your text is still here. If no draft opened, copy your message and email me directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
