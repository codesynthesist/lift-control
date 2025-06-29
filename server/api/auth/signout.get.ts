import { removeSession } from '@/server/utils/auth';

export default defineEventHandler((event) => {
    removeSession(event);

    return { ok: true };
})
