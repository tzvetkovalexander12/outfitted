import Link from "next/link";
import { LegalBackButton } from "./legal-back-button";

type LegalPageShellProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <main className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      <nav className="mx-auto flex max-w-md items-center justify-between px-5 pb-4 pt-6">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-widest text-white transition hover:text-zinc-300"
        >
          FitAround
        </Link>
        <Link
          href="/outfit"
          className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-widest text-zinc-300 transition hover:scale-[1.02] hover:border-white/20 hover:text-white"
        >
          Try FitAround
        </Link>
      </nav>

      <article className="mx-auto max-w-md px-5 pb-16">
        <div className="mb-6">
          <LegalBackButton />
        </div>
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-white">{title}</h1>

        <div className="space-y-5 rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-6 text-sm leading-relaxed text-zinc-400">
          {children}
        </div>
      </article>
    </main>
  );
}
