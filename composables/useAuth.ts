import { $fetch } from 'ofetch';
import { CookieTypes } from '~/types';

export interface IUser {
    id: string;
    email: string;
    name?: string;
}

interface IAuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    token: string | null;
}

export const useAuth = () => {
    const accessToken = useCookie(CookieTypes.ACCESS_TOKEN);

    const state = useState<IAuthState>('auth', () => ({
        user: null,
        isAuthenticated: false,
        token: null,
    }));

    function setUser(data: IUser): void {
        if (data.id) {
            state.value.user = data;
            state.value.isAuthenticated = true;
        } else {
            throw createError({
                statusText: 'User not found',
            });
        }
    }

    async function signUp(email: string, password: string): Promise<IUser> {
        const data: IUser = await $fetch('/api/auth/signup', {
            method: 'POST',
            body: { email, password },
        });

        // a method that supposes the user logging in after registration
        setUser(data);

        return data;
    }

    async function signIn(email: string, password: string): Promise<IUser> {
        const data: IUser = await $fetch('/api/auth/signin', {
            method: 'POST',
            body: { email, password },
        });

        setUser(data);

        return data;
    }

    async function signOut(): Promise<void> {
        await $fetch('/api/auth/signout');

        state.value.user = null;
        state.value.isAuthenticated = false;
    }

    async function refreshSession(refreshToken: string): Promise<void> {
        await $fetch('/api/auth/refresh', {
            method: 'GET',
            params: {
                refreshToken,
            },
        });
    }

    const checkAuth = async () => {
        if (!accessToken.value) {
            state.value.token = null;
            state.value.user = null;
            state.value.isAuthenticated = false;

            return false;
        }

        try {
            const data: IUser = await $fetch('/api/auth/user');

            if (data.id) {
                state.value.token = accessToken.value;
                state.value.user = data;
                state.value.isAuthenticated = true;

                return true;
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }

        state.value.token = null;
        state.value.user = null;
        state.value.isAuthenticated = false;

        return false;
    };

    return {
        user: state.value.user,
        isAuthenticated: state.value.isAuthenticated,
        signIn,
        signOut,
        signUp,
        refreshSession,
        checkAuth,
    };
};
