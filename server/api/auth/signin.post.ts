import { db } from '@/server/utils/db';
import { CookieTypes, SignInRequest } from '@/types/auth';
import { setSession } from '~/server/utils/auth';

export default defineEventHandler(async (event) => {
    const { email, password }: SignInRequest = await readBody<SignInRequest>(event);

   // get user from auth db
    const { data, error: authError } = await db.auth.signInWithPassword({
        email,
        password,
    });

    if (authError) {
        throw createError({
            statusCode: authError.status || 401,
            statusMessage: authError.message || 'Authentication failed',
            data: authError,
        });
    }

    if (!data?.session) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Session data missing',
        });
    }

    const {
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token: refreshToken,
    } = data.session;

    setSession(event, { accessToken, expiresIn, refreshToken });

    return {
        [CookieTypes.ACCESS_TOKEN]: accessToken,
        [CookieTypes.REFRESH_TOKEN]: refreshToken,
        [CookieTypes.EXPIRES]: expiresIn,
    }
});
