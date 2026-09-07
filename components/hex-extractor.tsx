"use client";

import { useMemo, useState } from "react";

import { ColorCard } from "@/components/color-card";
import { extractColors } from "@/lib/extract-colors";

const EXAMPLE_TEXT = "Primary: #7950B5\nBackground: #FAF9FB\nAccent: #FF00AA";

export function HexExtractor() {
  const [text, setText] = useState("");
  const colors = useMemo(() => extractColors(text), [text]);

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="max-w-2xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Color utility
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          HEX Extractor
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">
          Paste text containing color values and extract them instantly.
        </p>
      </header>

      <section className="mt-10" aria-labelledby="input-heading">
        <div className="mb-3 flex items-center justify-between gap-4">
          <label id="input-heading" htmlFor="hex-input" className="text-sm font-medium text-zinc-900">
            Paste your text
          </label>
          <button
            type="button"
            onClick={() => setText(EXAMPLE_TEXT)}
            className="text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            Try an example
          </button>
        </div>
        <textarea
          id="hex-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Primary: #7950B5\nBackground: #FAF9FB"
          className="min-h-56 w-full resize-y rounded-2xl border border-zinc-300 bg-white px-5 py-4 font-mono text-sm leading-7 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-900/10"
          spellCheck={false}
          aria-describedby="input-help"
        />
        <p id="input-help" className="mt-2 text-sm text-zinc-500">
          Supports #RGB, #RGBA, #RRGGBB, and #RRGGBBAA values.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="results-heading" aria-live="polite">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="results-heading" className="text-xl font-semibold tracking-tight text-zinc-950">
            Detected colors
          </h2>
          {colors.length > 0 && (
            <p className="text-sm text-zinc-500">
              {colors.length} {colors.length === 1 ? "color" : "colors"} found
            </p>
          )}
        </div>

        {colors.length > 0 ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((color) => (
              <ColorCard key={color.hex} color={color} />
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-zinc-300 px-5 py-12 text-center text-zinc-500">
            No hex colors found.
          </p>
        )}
      </section>
    </main>
  );
}
