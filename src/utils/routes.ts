export const BASE_PATH = "/hotAppearance";

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
