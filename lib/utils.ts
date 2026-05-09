import type { StaticImageData } from 'next/image';

export function getImageSource(
  value: string | null | undefined,
  fallback: StaticImageData
) {
  if (!value) {
    return fallback;
  }

  return value;
}

export function safeSplitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}
