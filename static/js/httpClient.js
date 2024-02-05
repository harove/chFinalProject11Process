// httpClient.js

export const httpClient = (url, method='get') => fetch(url, {
    method,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Other client-side code...
