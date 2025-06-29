import { H3Event } from 'h3';
import { CookieTypes } from '~/types/auth';

type SessionCredentials = {
    [CookieTypes.ACCESS_TOKEN]: string;
    [CookieTypes.REFRESH_TOKEN]: string;
    [CookieTypes.EXPIRES]: number;
}

export function setSession(event: H3Event, authData: SessionCredentials) {
    const {
        accessToken,
        refreshToken,
        expiresIn,
    } = authData;

    // set access token in cookie
    setCookie(event, CookieTypes.ACCESS_TOKEN, accessToken, {
        maxAge: expiresIn,
    });

    // set refresh token in cookie
    setCookie(event, CookieTypes.REFRESH_TOKEN, refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });
}

export function removeSession(event: H3Event) {
    deleteCookie(event, CookieTypes.ACCESS_TOKEN);
    deleteCookie(event, CookieTypes.REFRESH_TOKEN);
}
