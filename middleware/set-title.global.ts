export default defineNuxtRouteMiddleware((to) => {
    useHead({
        title: to.meta.title || 'Система управления лифтами'
    });
});
