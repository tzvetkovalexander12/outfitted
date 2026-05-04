"use client";

import { useRouter } from "next/navigation";

export function LegalBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition hover:border-white/20 hover:text-white"
    >
      <span className="text-zinc-600">←</span> Go back
    </button>
  );
}
