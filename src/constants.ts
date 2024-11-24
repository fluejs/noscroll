export const NoScrollAttrs = {
    SCROLL_DISABLED: 'data-noscroll-target-scroll-disabled',
    // scrollbar width adjustment for an element with a disabled scrollbar.
    SCROLL_SCROLLBAR_WIDTH_ADJUSTMENT: 'data-noscroll-target-scroll-scrollbar-width-adjustment',
    SCROLLBAR_WIDTH_ADJUSTMENT: 'data-noscroll-target-scrollbar-width-adjustment',
    SCROLLABLE: 'data-noscroll-target-scrollable',
    GLOBAL_STYLES: 'data-noscroll-global-styles',
} as const;

export const NoScrollCssVars = {
    TARGET_SCROLLBAR_WIDTH: '--noscroll-target-scrollbar-width',
    TARGET_PADDING_RIGHT: '--noscroll-target-padding-right',
} as const;

export const DEFAULT_WINDOW_RESIZE_THROTTLE = 200;
