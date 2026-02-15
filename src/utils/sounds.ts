/**
 * IPA-based sound detection from pronunciation strings.
 *
 * Each sound maps to one or more IPA substrings. A word "has" a sound
 * if any of its IPA pronunciations contain at least one of the substrings.
 */

const SOUND_PATTERNS: Record<string, string[]> = {
  // Long O: /oʊ/ (American) or /əʊ/ (British)
  long_o: ["o\u028A", "\u0259\u028A", "o\u02D0"],
  // Long A: /eɪ/
  long_a: ["e\u026A"],
  // Long E: /iː/
  long_e: ["i\u02D0"],
  // Long I: /aɪ/
  long_i: ["a\u026A"],
  // Long U: /juː/ or /uː/
  long_u: ["ju\u02D0", "u\u02D0"],
};

/**
 * Check whether any of the given IPA pronunciations contain the
 * specified sound.
 */
export function hasSound(pronunciations: string[], sound: string): boolean {
  const patterns = SOUND_PATTERNS[sound];
  if (!patterns) return false;

  return pronunciations.some((ipa) =>
    patterns.some((pat) => ipa.includes(pat)),
  );
}
