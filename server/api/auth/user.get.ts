import { db } from '~/server/utils/db';
import { CookieTypes } from '~/types';

export default defineEventHandler(async (event) => {
    const access_token = getCookie(event, CookieTypes.ACCESS_TOKEN);
    const { data, error } = await db.auth.getUser(access_token);

    if (error) {
        throw createError({
            statusCode: error.status,
            statusMessage: error.message,
            data: error,
        });
    }

    return {
        id: data.user.id,
        email: data.user.email,
    };
});
