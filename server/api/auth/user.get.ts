import { db, query } from '@/server/utils/db';
import { CookieTypes } from '@/types/auth';

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

    if (data.user.id) {
        const [profile] = await query(
            db
                .from('profiles')
                .select()
                .eq('id', data.user.id)
        );

        return {
            id: data.user.id,
            email: data.user.email,
            name: profile.full_name,
            createdAt: profile.createdAt,
        };
    }
});
