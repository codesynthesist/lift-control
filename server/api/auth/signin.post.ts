import { db } from '~/server/utils/db';
import { CookieTypes } from '~/types';
import { $fetch } from 'ofetch';

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);

   // get user from auth db
    const { data, error: authError } = await db.auth.signInWithPassword({
        email,
        password,
    });

    if (authError) {
        throw createError({
            statusCode: authError.status,
            statusMessage: authError.message,
            data: authError,
        });
    }

    const { access_token, expires_in, refresh_token } = data.session;

    // set acccess token token in cookie
    setCookie(event, CookieTypes.ACCESS_TOKEN, access_token, {
        maxAge: expires_in,
    });

    // set refresh token in cookie
    setCookie(event, CookieTypes.REFRESH_TOKEN, refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    return {
        [CookieTypes.ACCESS_TOKEN]: access_token,
        [CookieTypes.REFRESH_TOKEN]: refresh_token,
        [CookieTypes.EXPIRES]: expires_in,
    }
});
