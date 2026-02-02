import COOKIE_KEYS from '@/core/assets/cookieKeys';
import { cookies } from 'next/headers';
import { up } from 'up-fetch';

export type TUpFetchResult = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    success: boolean;
    status: number;
    error: string | null;
    customMessage?: string | null;
    statusText: string;
    headers: Headers;
    url: string;
};

export type TUpFetchResultPromise = Promise<TUpFetchResult>;

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/v1/front-office`;

const logout = async () => {
    "use server"
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_KEYS.token)
}

/**
 * Configures up-fetch with centralized error handling in `parseResponse`.
 * 
 * Features:
 * - Never rejects (reject: () => false)
 * - All errors (network, JSON, HTTP) handled in one place
 * - Persian error messages for UI
 * - English comments for developers
 * - Supports JSON and non-JSON responses
 * - Dev-only logging
 */
export const upFetch = up(fetch, () => ({
    baseUrl: BASE_URL,
    reject: () => false, // Never reject — always return TUpFetchResult

    /**
     * Central response parser — handles success, HTTP errors, JSON parsing, and network issues.
     */
    async parseResponse(response): Promise<TUpFetchResult> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let data: any = null;
        let error: string | null = null;
        let customMessage: string | null = null;
        let success = response.ok;

        // 1. Read raw response body as text
        let rawText = '';
        try {
            rawText = await response.text();
        } catch (e) {
            customMessage = 'خطا در خواندن پاسخ سرور';
            console.error('Failed to read response body:', e);
            return {
                data,
                success: false,
                status: response.status,
                error,
                statusText: response.statusText,
                headers: response.headers,
                url: response.url,
            };
        }

        // 2. Try to parse JSON; fallback to raw text if invalid
        if (rawText) {
            try {
                data = JSON.parse(rawText);
            } catch (jsonError) {
                // Non-JSON response (e.g. HTML error page, plain text)
                data = rawText;
            }
        }

        // 3. Handle HTTP errors (non-2xx status codes)
        if (!response.ok) {
            success = false;
            error = response.statusText;

            // Server internal error
            if (response.status >= 500 && response.status <= 599) {
                customMessage = 'خطای سرور داخلی';
            }
            // Not found
            else if (response.status === 404) {
                customMessage = 'سرویس موقتاً در دسترس نیست';
            }
            // Unauthorized
            else if (response.status === 401) {
                customMessage = 'احراز هویت ناموفق';
               await logout()
            }
            // Forbidden
            else if (response.status === 403) {
                customMessage = 'دسترسی ممنوع';
            }
            // Use API-provided message if available
            else if (typeof data === 'object' && (data.message || data.error)) {
                error = data.message || data.error;
            }
            // Fallback HTTP error
            else {
                customMessage = `مشکلی پیش آمده لطفا کمی بعدد امتحان کنید.`;
            }
        }

        return {
            data,
            success,
            status: response.status,
            error,
            customMessage,
            statusText: response.statusText,
            headers: response.headers,
            url: response.url,
        };
    },

    /**
     * Global error logger — only for network/fetch failures (not HTTP errors)
     */
    onError(error, request) {
        if (process.env.NODE_ENV === 'development') {
            console.error('up-fetch Network Error:', error, 'Request:', request);
        }
    },
}));