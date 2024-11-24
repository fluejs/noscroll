<template>
    <div class="button-group">
        <button
            type="button"
            class="button"
            @click="onClick">
            {{ isDisabled ? 'Enable page scroll' : 'Disable page scroll' }}
        </button>
    </div>
    <div
        ref="block"
        class="block scroll-block">
        <p>Scrollable block</p>
        <DummyText />
    </div>
</template>

<script setup lang="ts">
import DummyText from './DummyText.vue';
import { createPageScrollToggler } from '../../src';
import { ref } from 'vue';

const isDisabled = ref(false);
const { togglePageScroll } = createPageScrollToggler();

const onClick = () => {
    togglePageScroll();
    isDisabled.value = !isDisabled.value;
};
</script>
