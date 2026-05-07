// Utility functions for working with localStorage

/**
 * Retrieve a value from localStorage. If the key is not present, return the provided default.
 * Because Next.js does server side rendering, we guard against window being undefined.
 * @param {string} key
 * @param {any} defaultValue
 */
export function getStored(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.error('Failed to parse localStorage value', e);
    return defaultValue;
  }
}

/**
 * Store a value in localStorage under the given key.
 * @param {string} key
 * @param {any} value
 */
export function setStored(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}