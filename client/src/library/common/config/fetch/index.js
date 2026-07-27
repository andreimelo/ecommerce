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

function getApiBaseUri(url) {
    try {
        const parsedUrl = new URL(url, window.location.origin);
        const marker = '/api/';
        const markerIndex = parsedUrl.pathname.indexOf(marker);
        if (markerIndex === -1) {
            return `${parsedUrl.origin}/api/v1`;
        }

        const versionPath = parsedUrl.pathname.slice(markerIndex).split('/').slice(0, 3).join('/');
        return `${parsedUrl.origin}${versionPath}`;
    } catch (error) {
        return '';
    }
}

async function requestFreshCsrfToken(url) {
    const apiBaseUri = getApiBaseUri(url);
    if (!apiBaseUri) {
        return '';
    }

    const response = await fetch(`${apiBaseUri}/auth/csrf-token`, {
        method      : 'GET',
        credentials : 'include',
        headers     : {
            Accept : 'application/json',
        },
    });

    const rawBody = await response.text();
    if (!rawBody) {
        return '';
    }

    try {
        const data = JSON.parse(rawBody);
        return data.csrfToken || '';
    } catch (error) {
        return '';
    }
}

async function shouldRetryWithFreshCsrf(response) {
    if (response.status !== 403) {
        return false;
    }

    const rawBody = await response.text();
    if (!rawBody) {
        return false;
    }

    try {
        const data = JSON.parse(rawBody);
        const message = String(data?.message || '').toLowerCase();
        return message.includes('csrf token');
    } catch (error) {
        return false;
    }
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

    const initialResponse = await fetch(url, {
        ...options,
        headers,
        credentials : 'include',
    });

    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        const retryWithCsrf = await shouldRetryWithFreshCsrf(initialResponse.clone());
        if (retryWithCsrf) {
            const freshToken = await requestFreshCsrfToken(url);
            if (freshToken) {
                const retryHeaders = {
                    ...headers,
                    'X-CSRF-Token' : freshToken,
                };

                return fetch(url, {
                    ...options,
                    headers     : retryHeaders,
                    credentials : 'include',
                });
            }
        }
    }

    return initialResponse;
}