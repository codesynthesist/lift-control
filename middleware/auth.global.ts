export default defineNuxtRouteMiddleware(async (to) => {
    const { isAuthenticated } = useAuth();

    if (process.server) {
        return;
    }

    if (!isAuthenticated.value && to.meta.public) {
        return;
    }

    if (!isAuthenticated.value) {
        return navigateTo(`/login?redirect=${to.path}`);
    }

    if (to.meta.public && isAuthenticated.value) {
        return navigateTo(to.query.redirect as string || '/');
    }

    return;
});
