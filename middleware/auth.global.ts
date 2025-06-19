export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server || to.meta.public) {
        return;
    }

    const { isAuthenticated } = useAuth();

    if (to.path === '/login' && isAuthenticated) {
        return navigateTo(to.query.redirect as string || '/');
    }

    if (!isAuthenticated) {
        return navigateTo(`/login?redirect=${to.path}`);
    }

    return;
});
