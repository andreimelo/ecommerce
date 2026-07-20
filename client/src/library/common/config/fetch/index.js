function getCookieValue(name) {
    if (typeof document === 'undefined') {
        return '';
    }

    const cookie = document.cookie
        .split(';')
        .map((item) => item.trim())
        .find((item) => item.startsWith(`${name}=`));

    return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : '';
}

export async function apiFetch(url, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const headers = {
        ...(options.headers || {}),
    };

    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        const csrfToken = getCookieValue('csrf_token');
        if (csrfToken && !headers['X-CSRF-Token'] && !headers['x-csrf-token']) {
            headers['X-CSRF-Token'] = csrfToken;
        }
    }

    return fetch(url, {
        ...options,
        headers,
        credentials : 'include',
    });
}