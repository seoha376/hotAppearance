const MIN_FONT_REM = 1.05;
const MAX_FONT_REM = 3.8;

function clampHotness(hotness: number): number {
  return Math.min(100, Math.max(0, hotness));
}

export function getFontSizeRem(hotness: number): number {
  const normalized = clampHotness(hotness) / 100;
  return Number((MIN_FONT_REM + normalized * (MAX_FONT_REM - MIN_FONT_REM)).toFixed(2));
}

export function getHotnessLabel(hotness: number): string {
  const value = clampHotness(hotness);

  if (value >= 88) {
    return "폭발적";
  }

  if (value >= 65) {
    return "상승중";
  }

  return "관심";
}
