"use client";

import { useEffect, useRef, useState } from "react";

import type { ExtractedColor } from "@/lib/extract-colors";

interface ColorCardProps {
  color: ExtractedColor;
}

type CopyState = "idle" | "copied" | "error";

export function ColorCard({ color }: ColorCardProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    resetTimer.current = setTimeout(() => setCopyState("idle"), 1500);
  }

  const statusText = copyState === "copied"
    ? "Copied!"
    : copyState === "error"
      ? "Copy failed"
      : "Click to copy";

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex min-h-72 w-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#111114] text-left shadow-[0_12px_32px_rgb(0_0_0_/_0.16)] transition duration-200 hover:-translate-y-1 hover:border-pink-500/50 hover:shadow-[0_16px_42px_rgb(236_72_153_/_0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]"
      aria-label={`Copy ${color.hex}, ${color.label}`}
    >
      <span
        className="relative flex min-h-48 flex-1 items-end p-5"
        style={{ backgroundColor: color.hex }}
      >
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
          {statusText}
        </span>
      </span>
      <span className="flex items-center justify-between gap-4 border-t border-white/5 px-5 py-4">
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-zinc-100">
            {color.label}
          </span>
          <span className="mt-1 block font-mono text-sm tracking-wide text-zinc-500">
            {color.hex}
          </span>
        </span>
      </span>
    </button>
  );
}
