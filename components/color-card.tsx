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
      className="group flex min-h-72 w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
      aria-label={`Copy ${color.hex}, ${color.label}`}
    >
      <span
        className="relative flex min-h-48 flex-1 items-end p-5"
        style={{ backgroundColor: color.hex }}
      />
      <span className="flex items-center justify-between gap-4 px-5 py-4">
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-zinc-900">
            {color.label}
          </span>
          <span className="mt-1 block font-mono text-sm tracking-wide text-zinc-500">
            {color.hex}
          </span>
        </span>
        <span className="shrink-0 text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-700">
          {statusText}
        </span>
      </span>
    </button>
  );
}
