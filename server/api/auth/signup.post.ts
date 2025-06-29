import { type SignUpRequest } from '@/types/auth';
import { setSession } from '~/server/utils/auth';

export default defineEventHandler(async (event) => {
    const { email, password, name }: SignUpRequest = await readBody(event);

    const { data: authData, error } = await db.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Authentication error',
            data: error,
        });
    }

    if (authData.session) {
        const {
            user,
            access_token: accessToken,
            expires_in: expiresIn,
            refresh_token: refreshToken,
        } = authData.session;

        const { error: profileError } = await db
            .from('profiles')
            .insert({ id: user.id, full_name: name });

        if (profileError) {
            // remove current user
            throw createError({
                statusCode: 400,
                statusMessage: 'Create profile error',
                data: profileError,
            });
        }

        setSession(event, { accessToken, expiresIn, refreshToken });

        return authData.session;
    }
});
