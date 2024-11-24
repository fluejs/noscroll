<template>
    <div class="button-group">
        <button
            type="button"
            class="button"
            @click="onClick">
            {{ isDisabled ? 'Enable elements scroll' : 'Disable elements scroll' }}
        </button>
    </div>
    <div>
        <div
            ref="block1"
            class="block scroll-block">
            <div class="block scroll-block-sticky">
                Im sticky
            </div>
            <p><code>With</code> scrollbar width adjustment</p>
            <DummyText />
        </div>
    </div>
    <div>
        <div
            ref="block2"
            class="block scroll-block">
            <div class="block scroll-block-sticky">
                Im sticky
            </div>
            <p><code>Without</code> scrollbar width adjustment</p>
            <DummyText />
        </div>
    </div>
</template>

<script setup lang="ts">
import DummyText from './DummyText.vue';
import { disableScroll, enableScroll } from '../../src';
import { ref, useTemplateRef } from 'vue';

const block1 = useTemplateRef<HTMLElement>('block1');
const block2 = useTemplateRef<HTMLElement>('block2');
const isDisabled = ref(false);

const onClick = () => {
    if (isDisabled.value) {
        enableScroll(block1.value!);
        enableScroll(block2.value!);
        isDisabled.value = false;
    } else {
        disableScroll(block1.value!);
        disableScroll(block2.value!, {
            scrollbarWidthAdjustment: false,
        });
        isDisabled.value = true;
    }
};
</script>
