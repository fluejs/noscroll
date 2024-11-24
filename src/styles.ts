import { NoScrollAttrs, NoScrollCssVars } from './constants.ts';
import { attrAsSelector } from './utils.ts';

export const appendGlobalStyles = () => {
    if (document.querySelector(attrAsSelector(NoScrollAttrs.GLOBAL_STYLES))) {
        return;
    }

    const scrollDisabledSelector = attrAsSelector(NoScrollAttrs.SCROLL_DISABLED);
    const scrollbarWidthAdjustmentSelector = attrAsSelector(NoScrollAttrs.SCROLLBAR_WIDTH_ADJUSTMENT);
    const scrollScrollbarWidthAdjustmentSelector = attrAsSelector(NoScrollAttrs.SCROLL_SCROLLBAR_WIDTH_ADJUSTMENT);

    const css = `    
    ${scrollDisabledSelector} {
        overflow: hidden !important;
    }
    
    ${scrollDisabledSelector} ${scrollbarWidthAdjustmentSelector},
    ${scrollDisabledSelector}${scrollScrollbarWidthAdjustmentSelector} {
        padding-right: calc(var(${NoScrollCssVars.TARGET_PADDING_RIGHT}) + var(${NoScrollCssVars.TARGET_SCROLLBAR_WIDTH})) !important;
    }
    `;

    const styleEl = document.createElement('style');
    styleEl.setAttribute(NoScrollAttrs.GLOBAL_STYLES, '');
    styleEl.appendChild(document.createTextNode(css));

    document.head.appendChild(styleEl);
};
