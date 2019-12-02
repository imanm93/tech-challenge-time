/**
 * Setup Root URL to API
 */
let url = 'http://127.0.0.1:5000/api/v1';

if (process.env.NODE_ENV === 'production') {
  // Enter production url here
}

export const ROOT_URL = url;
