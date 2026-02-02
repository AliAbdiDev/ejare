// lib/auth-session.ts
import COOKIE_KEYS from "@/core/assets/cookieKeys";
import { User } from "@/core/assets/types";
import { cookies } from "next/headers";

type AuthSession = {
    user: User;
    token: string;
    isLoggedIn: boolean
};


export async function getAuthSession(): Promise<AuthSession | null> {
    const cookieStore = await cookies();
    const userToken = cookieStore.get(COOKIE_KEYS.token)?.value;
    const isLoggedIn = cookieStore.has(COOKIE_KEYS.token);
    const userData = cookieStore.get(COOKIE_KEYS.userData)?.value;

    if (!userToken) return null;

    try {
        const session: AuthSession = { user: userData ? JSON.parse(userData as string) : null, token: userToken, isLoggedIn };
        return session;
    } catch (error) {
        console.error("خطا در پارس سشن کوکی:", error);
        return null;
    }
}
