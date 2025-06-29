import { $fetch } from 'ofetch';
import {
    CookieTypes,
    type IUser,
    type SignInRequest,
    type SignInResponse,
    type SignUpRequest,
} from '@/types/auth';


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
                state.value.token = accessToken.value as string;
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

    async function signUp(body: SignUpRequest): Promise<{ session: object }> {
        return await $fetch('/api/auth/signup', {
            method: 'POST',
            body,
        });

        // what returns?
    }

    async function signIn(body: SignInRequest): Promise<SignInResponse> {
        const data: SignInResponse = await $fetch('/api/auth/signin', {
            method: 'POST',
            body,
        });

        await checkAuth();

        return data;
    }

    async function signOut(): Promise<void> {
        await $fetch('/api/auth/signout');
        await checkAuth();

        console.log('session signed out');
    }

    async function refreshSession(refreshToken: string): Promise<void> {
        await $fetch('/api/auth/refresh', {
            method: 'GET',
            params: {
                refreshToken,
            },
        });
    }


    return {
        user: toRef(state.value, 'user'),
        isAuthenticated: toRef(state.value, 'isAuthenticated'),
        signUp,
        signIn,
        signOut,
        refreshSession,
        checkAuth,
    };
};
