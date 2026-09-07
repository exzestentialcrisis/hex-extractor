export interface ExtractedColor {
  label: string;
  hex: string;
}

const HEX_COLOR_PATTERN = /(?:#[0-9a-f]{3}|#[0-9a-f]{4}|#[0-9a-f]{6}|#[0-9a-f]{8})(?![0-9a-f])/gi;
const LABEL_SEPARATOR_PATTERN = /^[\s:|=–—-]+|[\s:|=–—-]+$/g;

function getLineBefore(text: string, index: number): string {
  const lineStart = text.lastIndexOf("\n", index - 1) + 1;
  return text.slice(lineStart, index);
}

function cleanLabel(value: string): string {
  return value.replace(LABEL_SEPARATOR_PATTERN, "").trim();
}

export function extractColors(text: string): ExtractedColor[] {
  const colors: ExtractedColor[] = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null;
  let fallbackIndex = 1;

  HEX_COLOR_PATTERN.lastIndex = 0;

  while ((match = HEX_COLOR_PATTERN.exec(text)) !== null) {
    const hex = match[0].toUpperCase();

    if (seen.has(hex)) {
      continue;
    }

    seen.add(hex);
    const label = cleanLabel(getLineBefore(text, match.index));
    colors.push({
      label: label || `Color ${fallbackIndex}`,
      hex,
    });
    fallbackIndex += 1;
  }

  return colors;
}
