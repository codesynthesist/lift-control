<template>
    <a-breadcrumb style="margin-bottom: 16px">
        <a-breadcrumb-item v-for="crumb of breadcrumbs">
            <NuxtLink v-if="crumb.path !== route.path" :href="crumb.path">{{ crumb.title }}</NuxtLink>
            <template v-else>{{ crumb.title }}</template>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script setup lang="ts">
    interface Breadcrumb {
        path: string,
        title: string,
    }

    const router = useRouter();
    const route = useRoute();

    const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
       const pathArray = router.currentRoute.value.path
           .split('/')
           .slice(1);

       return pathArray.map((path, index) => {
           const fullPath = `/${pathArray.slice(0, index + 1).join('/')}`;
           const matchedRoute = router.resolve(fullPath);

           console.log(matchedRoute);

           return {
               path: fullPath,
               title: ((matchedRoute.meta?.title as string | undefined) ?? ''),
           };
       });
    });
</script>

