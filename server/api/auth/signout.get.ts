import { CookieTypes } from '~/types';

export default defineEventHandler((event) => {
    deleteCookie(event, CookieTypes.ACCESS_TOKEN);
    deleteCookie(event, CookieTypes.REFRESH_TOKEN);
})
