"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();
  // Prerendered source paths can differ from the browser URL on Vercel.
  const [activePathname, setActivePathname] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setActivePathname(pathname);
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const focusable = menuPanelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="glass-panel pointer-events-auto mx-auto flex min-h-14 max-w-3xl items-center justify-between rounded-full px-3 sm:px-4">
        <Link href="/" aria-label="Thunderboy home" className="flex min-h-11 shrink-0 items-center px-2">
          <Image
            src="/brand/logos/thunderboy-wordmark-white.svg"
            alt="Thunderboy"
            width={170}
            height={34}
            priority
            className="h-auto w-[122px] sm:w-[138px]"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = activePathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-10 items-center rounded-full px-4 text-sm font-bold transition-colors duration-200 ${
                  active ? "bg-white/10 text-white" : "text-white/[0.55] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {active && <span aria-hidden="true" className="mr-2 size-1.5 rounded-full bg-voltage" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          ref={toggleButtonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((open) => !open)}
          className="flex size-11 items-center justify-center rounded-full border border-white/[0.15] text-white transition-colors hover:bg-white/10 md:hidden"
        >
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-[3px] h-px w-5 bg-current transition-transform duration-200 ${
                isOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-[3px] left-0 h-px w-5 bg-current transition-transform duration-200 ${
                isOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          ref={menuPanelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="pointer-events-auto fixed inset-0 -z-10 flex items-center bg-carbon/95 px-6 pt-24 backdrop-blur-3xl md:hidden"
        >
          <nav aria-label="Mobile navigation" className="mx-auto flex w-full max-w-md flex-col items-stretch">
            {NAV_ITEMS.map((item) => {
              const active = activePathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`display-heading border-b border-white/10 py-5 text-center text-5xl transition-colors ${
                    active ? "text-voltage" : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
