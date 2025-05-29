<template>
    <PageTitle>
        <template #actions>
            <nuxt-link to="/elevators/add">
                <a-button type="primary">Добавить</a-button>
            </nuxt-link>
        </template>
    </PageTitle>

    <div class="flex flex-wrap">
        <nuxt-link
            v-for="elevator of elevators"
            :key="elevator.id"
            :to="`/elevators/${elevator.id}`"
        >
            <a-card
                hoverable
                class="mr-5 mb-5"
                style="width: 240px"
            >
                <template #cover>
                    <!--                <nuxt-img></nuxt-img>-->
                </template>

                <a-card-meta :title="elevator.name">
                    <template #description>
                        <p class="lift-card__state">
                            <MenuUnfoldOutlined />
                            <b>6</b>
                        </p>
                        <p class="lift-card__state">
                            <QuestionCircleOutlined />
                            <b>6</b>
                        </p>
                    </template>
                </a-card-meta>
            </a-card>
        </nuxt-link>

    </div>
</template>

<script setup lang="ts">
import { useElevatorsStore } from '~/stores/elevator';

definePageMeta({
    title: 'Лифты',
});

const elevatorsStore = useElevatorsStore();

const { elevators } = storeToRefs(elevatorsStore)

</script>

<style scoped lang="scss">
.lift-card {
    &__state {
        display: flex;
        margin-bottom: 4px;

        b {
            display: inline-block;
            line-height: 1em;
            margin-left: 8px;
        }
    }
}
</style>
