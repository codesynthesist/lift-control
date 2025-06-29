// auth
export const enum CookieTypes {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
    EXPIRES = 'expiresIn',
}

type AuthCredentials = {
    email: string;
    password: string;
}

export type SignUpRequest = AuthCredentials & {
    name: string;
}

export type SignInRequest = AuthCredentials;

export type SignInResponse = Record<CookieTypes, string>;

export interface IUser {
    id: string;
    email: string;
    name?: string;
    createdAt?: Date;
}
