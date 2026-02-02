import { string } from "zod";

export type UnionCoockieKeys = keyof typeof COOKIE_KEYS

const COOKIE_KEYS = {
    token: 'token',
    userData:'userData'
} as const;
export default COOKIE_KEYS;