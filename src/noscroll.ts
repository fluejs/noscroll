import type { NoScrollOptions } from './types.ts';
import {
    asArray,
    attrAsSelector,
    createQueue,
    getScrollbarWidth,
    throttle,
} from './utils.ts';
import {
    DEFAULT_WINDOW_RESIZE_THROTTLE,
    NoScrollAttrs,
    NoScrollCssVars,
} from './constants.ts';
import { appendGlobalStyles } from './styles.ts';

export const createNoScroll = (options?: NoScrollOptions) => {
    const adjustScrollbarWidth = (target: HTMLElement | HTMLElement[]) => {
        asArray(target).forEach((el) => {
            el.removeAttribute(NoScrollAttrs.SCROLLBAR_WIDTH_ADJUSTMENT);

            const computedStyle = window.getComputedStyle(el);
            el.style.setProperty(NoScrollCssVars.TARGET_PADDING_RIGHT, computedStyle.paddingRight);
            el.setAttribute(NoScrollAttrs.SCROLLBAR_WIDTH_ADJUSTMENT, '');
        });
    };

    const removeScrollbarWidthAdjustment = (target: HTMLElement | HTMLElement[]) => {
        asArray(target).forEach((el) => {
            el.removeAttribute(NoScrollAttrs.SCROLLBAR_WIDTH_ADJUSTMENT);
            el.style.removeProperty(NoScrollCssVars.TARGET_PADDING_RIGHT);
        });
    };

    const adjustScrollScrollbarWidth = (target: HTMLElement | HTMLElement[]) => {
        asArray(target).forEach((el) => {
            let scrollDisabled = false;

            el.removeAttribute(NoScrollAttrs.SCROLL_SCROLLBAR_WIDTH_ADJUSTMENT);

            if (el.getAttribute(NoScrollAttrs.SCROLL_DISABLED) !== null) {
                scrollDisabled = true;
                el.removeAttribute(NoScrollAttrs.SCROLL_DISABLED);
            }

            el.style.setProperty(NoScrollCssVars.TARGET_SCROLLBAR_WIDTH, `${getScrollbarWidth(el)}px`);

            if (scrollDisabled) {
                el.setAttribute(NoScrollAttrs.SCROLL_DISABLED, '');
            }

            const computedStyle = window.getComputedStyle(el);
            el.style.setProperty(NoScrollCssVars.TARGET_PADDING_RIGHT, computedStyle.paddingRight);
            el.setAttribute(NoScrollAttrs.SCROLL_SCROLLBAR_WIDTH_ADJUSTMENT, '');
        });
    };

    const removeScrollScrollbarWidthAdjustment = (target: HTMLElement | HTMLElement[]) => {
        asArray(target).forEach((el) => {
            el.removeAttribute(NoScrollAttrs.SCROLL_SCROLLBAR_WIDTH_ADJUSTMENT);
            el.style.removeProperty(NoScrollCssVars.TARGET_SCROLLBAR_WIDTH);
            el.style.removeProperty(NoScrollCssVars.TARGET_PADDING_RIGHT);
        });
    };

    const updateAllScrollbarWidthAdjustment = () => {
        adjustScrollbarWidth(
            [...document.querySelectorAll<HTMLElement>(
                attrAsSelector(NoScrollAttrs.SCROLLBAR_WIDTH_ADJUSTMENT),
            )],
        );

        adjustScrollScrollbarWidth(
            [...document.querySelectorAll<HTMLElement>(
                attrAsSelector(NoScrollAttrs.SCROLL_SCROLLBAR_WIDTH_ADJUSTMENT),
            )],
        );
    };

    const handleWindowResize = throttle(
        updateAllScrollbarWidthAdjustment,
        options?.windowResizeThrottle ?? DEFAULT_WINDOW_RESIZE_THROTTLE,
    );
    const {
        init: initScrollDisable,
        reset: resetScrollDisable,
    } = createQueue(
        () => {
            if (!options?.noHandleWindowResize) {
                window.addEventListener('resize', handleWindowResize);
            }

            options?.onInitScrollDisable?.();
        },
        () => {
            if (!options?.noHandleWindowResize) {
                window.removeEventListener('resize', handleWindowResize);
            }

            options?.onResetScrollDisable?.();
        },
    );

    const disableScroll = (target: HTMLElement, {
        scrollbarWidthAdjustment = true,
    }: {
        scrollbarWidthAdjustment?: boolean;
    } = {}) => {
        appendGlobalStyles();
        initScrollDisable();
        options?.onScrollDisable?.(target);

        if (scrollbarWidthAdjustment) {
            adjustScrollScrollbarWidth(target);
        }

        target.setAttribute(NoScrollAttrs.SCROLL_DISABLED, '');
    };

    const enableScroll = (target: HTMLElement) => {
        if (target.getAttribute(NoScrollAttrs.SCROLL_DISABLED) === null) {
            return;
        }

        resetScrollDisable();
        options?.onScrollEnable?.(target);
        removeScrollScrollbarWidthAdjustment(target);
        target.removeAttribute(NoScrollAttrs.SCROLL_DISABLED);
    };

    const {
        init: disablePageScroll,
        reset: enablePageScroll,
        initIsCalled: pageScrollIsDisabled,
    } = createQueue(
        () => disableScroll(document.body),
        () => enableScroll(document.body),
    );

    const createPageScrollToggler = () => {
        let isDisabled = false;

        const toggler = {
            disablePageScroll() {
                if (isDisabled) {
                    return;
                }

                disablePageScroll();
                isDisabled = true;
            },
            enablePageScroll() {
                if (!isDisabled) {
                    return;
                }

                enablePageScroll();
                isDisabled = false;
            },
            togglePageScroll() {
                if (isDisabled) {
                    toggler.enablePageScroll();
                } else {
                    toggler.disablePageScroll();
                }
            },
        };

        return toggler;
    };

    const markScrollable = (target: HTMLElement | HTMLElement[]) => {
        asArray(target).forEach((el) => {
            el.setAttribute(NoScrollAttrs.SCROLLABLE, '');
        });
    };

    const unmarkScrollable = (target: HTMLElement | HTMLElement[]) => {
        asArray(target).forEach((el) => {
            el.removeAttribute(NoScrollAttrs.SCROLLABLE);
        });
    };

    return {
        adjustScrollbarWidth,
        removeScrollbarWidthAdjustment,
        updateAllScrollbarWidthAdjustment,
        disableScroll,
        enableScroll,
        disablePageScroll,
        enablePageScroll,
        pageScrollIsDisabled,
        createPageScrollToggler,
        markScrollable,
        unmarkScrollable,
    };
};
