// Matches "application/json", "text/json" and structured suffixes such as
// "application/vnd.api+json" or "application/problem+json", with optional parameters.
const jsonContentType = /^(?:application|text)\/(?:[a-z0-9.\-]+\+)?json\s*(?:;|$)/i;

/** Is this a JSON content type (as reported by document.contentType or a Content-Type header)? */
export function isJSONContentType(contentType: string): boolean {
  return jsonContentType.test(contentType);
}
