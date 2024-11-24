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
            class="block scroll-block"
            style="height: 6.5em">
            <div
                ref="abs"
                class="block scroll-block-abs">
                <code>position: absolute</code> element <code>with</code> scrollbar width adjustment
            </div>
        </div>
    </div>
    <div>
        <div
            ref="block2"
            class="block scroll-block"
            style="height: 6.5em">
            <div class="block scroll-block-abs">
                <code>position: absolute</code> element <code>without</code> scrollbar width adjustment
            </div>
        </div>
    </div>
    <div>
        <div
            ref="block3"
            class="block scroll-block"
            style="height: 6.5em">
            <div
                class="block scroll-block-abs"
                style="max-width: calc(100% - var(--noscroll-target-scrollbar-width, 0px))">
                <code>position: absolute</code> element <code>with</code> CSS variable
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    adjustScrollbarWidth,
    disableScroll,
    enableScroll,
} from '../../src';
import {
    onMounted,
    ref,
    useTemplateRef,
} from 'vue';

const abs = useTemplateRef<HTMLElement>('abs');
const block1 = useTemplateRef<HTMLElement>('block1');
const block2 = useTemplateRef<HTMLElement>('block2');
const block3 = useTemplateRef<HTMLElement>('block3');
const isDisabled = ref(false);

const onClick = () => {
    if (isDisabled.value) {
        enableScroll(block1.value!);
        enableScroll(block2.value!);
        enableScroll(block3.value!);
        isDisabled.value = false;
    } else {
        disableScroll(block1.value!);
        disableScroll(block2.value!);
        disableScroll(block3.value!);
        isDisabled.value = true;
    }
};

onMounted(() => {
    adjustScrollbarWidth(abs.value!);
});
</script>
