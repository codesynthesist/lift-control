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

    const { access_token, expires_in, refresh_token } = data.session

    // set access token in cookie
    setCookie(event, CookieTypes.ACCESS_TOKEN, access_token, {
        maxAge: expires_in * 1000,
    });

    // set refresh token in cookie
    setCookie(event, CookieTypes.REFRESH_TOKEN, refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    // get new User

    return await $fetch('/api/auth/user', {
        headers: {
            Cookie: getCookie(event, CookieTypes.ACCESS_TOKEN) as string,
        }
    });
});
