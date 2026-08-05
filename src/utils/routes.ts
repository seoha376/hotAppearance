declare const __BASE_PATH__: string | undefined;

function normalizeBasePath(value: string | undefined): string {
  const fallback = "/";
  const rawValue = value?.trim() || fallback;
  const withLeadingSlash = rawValue.startsWith("/") ? rawValue : `/${rawValue}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");

  return withoutTrailingSlash === "" ? "" : withoutTrailingSlash;
}

export const BASE_PATH = normalizeBasePath(
  typeof __BASE_PATH__ === "string" ? __BASE_PATH__ : process.env.VITE_BASE_PATH
);

const KEYWORD_ID_PATTERN = /^[a-z0-9-]+$/;

export function validateKeywordId(keywordId: string): string {
  if (!KEYWORD_ID_PATTERN.test(keywordId)) {
    throw new Error(`Invalid keyword id: ${keywordId}`);
  }

  return keywordId;
}

export function getKeywordPath(keywordId: string): string {
  return `/keywords/${validateKeywordId(keywordId)}/`;
}

export function getKeywordHref(keywordId: string): string {
  return `${BASE_PATH}${getKeywordPath(keywordId)}`;
}
