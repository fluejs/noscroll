import {
    adjustScrollbarWidth,
    markScrollable,
    removeScrollbarWidthAdjustment,
    unmarkScrollable,
    createPageScrollToggler,
} from './index.ts';
import {
    type Directive,
    type MaybeRefOrGetter,
    onBeforeUnmount,
    onMounted,
    toValue,
    watch,
} from 'vue';

export const vAdjustScrollbarWidth: Directive<HTMLElement> = {
    mounted(el) {
        adjustScrollbarWidth(el);
    },
    beforeUnmount(el) {
        removeScrollbarWidthAdjustment(el);
    },
};

export const vMarKScrollable: Directive<HTMLElement> = {
    mounted(el: HTMLElement) {
        markScrollable(el);
    },
    beforeUnmount(el: HTMLElement) {
        unmarkScrollable(el);
    },
};

export const usePageScrollToggle = (
    isDisabled: MaybeRefOrGetter<boolean>,
    {
        immediate = true,
        toggler = createPageScrollToggler,
    }: {
        immediate?: boolean;
        toggler?: typeof createPageScrollToggler;
    } = {},
) => {
    const { enablePageScroll, disablePageScroll } = toggler();

    watch(() => toValue(isDisabled), (value) => {
        if (value) {
            disablePageScroll();
        } else {
            enablePageScroll();
        }
    }, {
        flush: 'post',
    });

    onMounted(() => {
        if (immediate && toValue(isDisabled)) {
            disablePageScroll();
        }
    });

    onBeforeUnmount(() => {
        enablePageScroll();
    });
};
