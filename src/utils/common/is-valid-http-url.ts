/**
 * Check for valid http/https url
 * @example
 * isValidHttpUrl(null) // false
 * isValidHttpUrl('random-string') // false
 * isValidHttpUrl('www.google.com') // false
 * isValidHttpUrl('http://localhost:3000') // true
 * isValidHttpUrl('https://www.google.com') // true
 */
export function isValidHttpUrl(url?: unknown) {
  if (typeof url !== 'string') {
    return false;
  }

  let _url;

  try {
    _url = new URL(url);
  } catch (_) {
    return false;
  }

  return _url.protocol === 'http:' || _url.protocol === 'https:';
}
