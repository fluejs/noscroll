import { createNoScroll } from './noscroll.ts';

export const {
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
} = createNoScroll();

export { NoScrollAttrs, NoScrollCssVars } from './constants.ts';

export { createNoScroll };
