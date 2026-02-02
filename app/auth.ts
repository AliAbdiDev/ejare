"use server";

import { cookies } from "next/headers";
import { TUpFetchResult, upFetch } from "../core/services/api/upFetchConfig";
import COOKIE_KEYS from "@/core/assets/cookieKeys";

export type loginData = { mobile: string }
export type otpData = { otp: string, mobile: loginData['mobile'] }

const coockieAge = 60 * 60 * 24 * 7;

export async function actionAuthLogin({ mobile }: loginData): Promise<Partial<TUpFetchResult>> {

    const result = await upFetch("/auth/request-otp", {
        method: "POST",
        body: { mobile },
    });

    if (!result.success) return { success: false }

    return { success: true, data: result.data };
}

export const actionAuthOtp = async ({ otp, mobile }: otpData) => {

    const result = await upFetch("/auth/verify-otp", {
        method: "POST",
        body: { otp, mobile },
    });

    if (!result.success && !result?.data?.data?.token) 
        return { success: false, customMessage: result?.customMessage }

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_KEYS?.token || '', result?.data?.data?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: coockieAge,
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });

    if (result?.data?.data?.customer) {

        cookieStore.set(COOKIE_KEYS?.userData || '', JSON.stringify(result?.data?.data?.customer || {}), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: coockieAge,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        });
    }

    return { success: true };
}