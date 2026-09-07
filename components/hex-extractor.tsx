"use client";

import { useMemo, useState } from "react";

import { ColorCard } from "@/components/color-card";
import { extractColors } from "@/lib/extract-colors";

const EXAMPLE_TEXT = "Primary: #7950B5\nBackground: #FAF9FB\nAccent: #FF00AA";

export function HexExtractor() {
  const [text, setText] = useState("");
  const colors = useMemo(() => extractColors(text), [text]);

  return (
    <main className="mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-8 sm:py-20">
      <header className="max-w-2xl">
        <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-pink-400">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-400 shadow-[0_0_12px_rgb(244_114_182_/_0.8)]" />
          Utility tool
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-50 sm:text-6xl">
          <span className="text-pink-400">HEX</span> Extractor
        </h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">
          Paste text containing color values and extract them instantly.
        </p>
      </header>

      <section className="mt-12" aria-labelledby="input-heading">
        <div className="mb-3 flex items-center justify-between gap-4">
          <label id="input-heading" htmlFor="hex-input" className="text-sm font-medium text-zinc-200">
            Paste your text
          </label>
          <button
            type="button"
            onClick={() => setText(EXAMPLE_TEXT)}
            className="text-sm text-zinc-500 underline decoration-zinc-700 underline-offset-4 transition hover:text-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]"
          >
            Try an example
          </button>
        </div>
        <textarea
          id="hex-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Primary: #7950B5\nBackground: #FAF9FB"
          className="min-h-60 w-full resize-y rounded-2xl border border-zinc-800 bg-[#111114] px-5 py-4 font-mono text-sm leading-7 text-zinc-100 shadow-[0_18px_50px_rgb(0_0_0_/_0.18)] outline-none transition placeholder:text-zinc-600 hover:border-zinc-700 focus:border-pink-500/70 focus:ring-4 focus:ring-pink-500/10"
          spellCheck={false}
          aria-describedby="input-help"
        />
        <p id="input-help" className="mt-3 text-sm text-zinc-600">
          Supports #RGB, #RGBA, #RRGGBB, and #RRGGBBAA values.
        </p>
      </section>

      <section className="mt-16" aria-labelledby="results-heading" aria-live="polite">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="results-heading" className="text-xl font-semibold tracking-tight text-zinc-100">
            Detected colors
          </h2>
          {colors.length > 0 && (
            <p className="rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-300">
              {colors.length} {colors.length === 1 ? "color" : "colors"} found
            </p>
          )}
        </div>

        {colors.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {colors.map((color) => (
              <ColorCard key={color.hex} color={color} />
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-zinc-800 bg-[#111114]/70 px-5 py-14 text-center text-zinc-500">
            No hex colors found.
          </p>
        )}
      </section>
    </main>
  );
}
