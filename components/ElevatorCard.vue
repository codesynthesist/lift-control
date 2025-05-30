<template>
    <a-card
        hoverable
        class="mr-5 mb-5 elevator-card"
        :class="statusClass"
    >
        <template #cover>
            <!--  <nuxt-img></nuxt-img>-->
        </template>

        <a-card-meta :title="elevator.name">
            <template #description>
                <p class="elevator-card__state">
                    <MenuUnfoldOutlined />
                    <b>{{ state.currentFloor }}</b>
                </p>
                <p class="elevator-card__state">
                    <VerticalAlignMiddleOutlined />
                    <b>
                        <UpCircleTwoTone v-if="state.direction === Direction.UP"/>
                        <DownCircleTwoTone v-else-if="state.direction === Direction.DOWN"/>
                        <template v-else>-</template>
                    </b>
                </p>
            </template>
        </a-card-meta>
    </a-card>
</template>

<script setup lang="ts">
import { Direction, type ElevatorConfig, type ElevatorState } from '~/types';

const props = defineProps<({
    elevator: ElevatorConfig,
    state: ElevatorState,
})>();

const statusClass = computed(() => {
    const isDisabled = !props.state.enabled;
    const isBroken = false;

    return {
        'elevator-card__state__disabled': isDisabled,
        'elevator-card__state__broken': isBroken,
    }
})

</script>

<style lang="scss" scoped>
.elevator-card {
    &__state {
        &__disabled {
            background-color: rgba(#eee, 50%);
        }

        &__broken {
            background-color: rgba(#eee, 50%);
        }
    }

    &__state {
        display: flex;
        margin-bottom: 4px;
        gap: 4px;

        b {
            display: inline-block;
            line-height: 1em;
        }
    }
}
</style>
