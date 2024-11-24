import { attrAsSelector } from './utils.ts';
import { NoScrollAttrs } from './constants.ts';

const TOUCH_DETECTION_OFFSET = 3;

const touchState = {
    isPageScrollDisabled: false,
    startTouchY: 0,
    startTouchX: 0,
};

const querySelectorClosestParent = (
    fromTarget: HTMLElement,
    selector: string,
    matchSelf: boolean = true,
    rootTarget: HTMLElement | Document = document,
) => {
    let current = matchSelf ? fromTarget : fromTarget.parentElement;

    while (current && current !== rootTarget) {
        if (current.matches(selector)) {
            return current;
        }
        current = current.parentElement;
    }

    return null;
};

const isScrollableInput = (target: HTMLElement) => {
    const selector = 'textarea, [contenteditable="true"]';
    return target.matches(selector);
};

const isInputRage = (target: HTMLElement) => {
    const selector = 'input[type="range"]';
    return target.matches(selector);
};

export const hasOverflowHidden = (target: HTMLElement) => {
    const computedStyle = getComputedStyle(target);
    return computedStyle.overflow === 'hidden';
};
export const isAtScrollTop = (target: HTMLElement) => {
    if (hasOverflowHidden(target)) {
        return true;
    }

    const scrollTop = target.scrollTop;
    return scrollTop <= 0;
};
export const isAtScrollBottom = (target: HTMLElement) => {
    if (hasOverflowHidden(target)) {
        return true;
    }

    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const scrollTopWithHeight = scrollTop + target.offsetHeight;
    return scrollTopWithHeight >= scrollHeight;
};
export const isAtScrollLeft = (target: HTMLElement) => {
    if (hasOverflowHidden(target)) {
        return true;
    }

    const scrollLeft = target.scrollLeft;
    return scrollLeft <= 0;
};
export const isAtScrollRight = (target: HTMLElement) => {
    if (hasOverflowHidden(target)) {
        return true;
    }

    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const scrollLeftWithWidth = scrollLeft + target.offsetWidth;
    return scrollLeftWithWidth >= scrollWidth;
};

const onTouchStart = (e: TouchEvent) => {
    touchState.isPageScrollDisabled = document.body.matches(attrAsSelector(NoScrollAttrs.SCROLL_DISABLED));
    touchState.startTouchY = e.touches[0].clientY;
    touchState.startTouchX = e.touches[0].clientX;
};

/*
 * Reference: https://github.com/FL3NKEY/scroll-lock/blob/master/src/scroll-lock.js#L381
 */
const onTouchMove = (e: TouchEvent) => {
    if (!touchState.isPageScrollDisabled) {
        return;
    }

    if (e.touches.length > 2) {
        return;
    }

    const { startTouchY, startTouchX } = touchState;
    const currentClientY = e.touches[0].clientY;
    const currentClientX = e.touches[0].clientX;

    const direction = {
        isUp: startTouchY < currentClientY,
        isDown: startTouchY > currentClientY,
        isLeft: startTouchX < currentClientX,
        isRight: startTouchX > currentClientX,
    };

    const directionWithOffset = {
        isUp: startTouchY + TOUCH_DETECTION_OFFSET < currentClientY,
        isDown: startTouchY - TOUCH_DETECTION_OFFSET > currentClientY,
        isLeft: startTouchX + TOUCH_DETECTION_OFFSET < currentClientX,
        isRight: startTouchX - TOUCH_DETECTION_OFFSET > currentClientX,
    };

    const handle = (
        el: HTMLElement | null,
        skip = false,
    ) => {
        if (!el) {
            if (e.cancelable) {
                e.preventDefault();
            }

            return;
        }

        if (isInputRage(el)) {
            return;
        }

        const scrollableParent = querySelectorClosestParent(
            el,
            attrAsSelector(NoScrollAttrs.SCROLLABLE),
            false,
        );

        if (!(skip
            || (isScrollableInput(el) && querySelectorClosestParent(el, attrAsSelector(NoScrollAttrs.SCROLLABLE)))
            || el.matches(attrAsSelector(NoScrollAttrs.SCROLLABLE))
        )) {
            handle(scrollableParent);

            return;
        }

        let prevent = false;

        if (isAtScrollLeft(el) && isAtScrollRight(el)) {
            if (
                (direction.isUp && isAtScrollTop(el))
                || (direction.isDown && isAtScrollBottom(el))
            ) {
                prevent = true;
            }
        } else if (isAtScrollTop(el) && isAtScrollBottom(el)) {
            if (
                (direction.isLeft && isAtScrollLeft(el))
                || (direction.isRight && isAtScrollRight(el))
            ) {
                prevent = true;
            }
        } else if (
            (directionWithOffset.isUp && isAtScrollTop(el))
            || (directionWithOffset.isDown && isAtScrollBottom(el))
            || (directionWithOffset.isLeft && isAtScrollLeft(el))
            || (directionWithOffset.isRight && isAtScrollRight(el))
        ) {
            prevent = true;
        }

        if (prevent) {
            if (scrollableParent) {
                handle(scrollableParent, true);
            } else if (e.cancelable) {
                e.preventDefault();
            }
        }
    };

    handle(e.target as HTMLElement | null);
};

const onTouchEnd = () => {
    touchState.startTouchY = 0;
    touchState.startTouchX = 0;
};

export const initTouchHandler = () => {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove, {
        passive: false,
    });
    document.addEventListener('touchend', onTouchEnd);
};

export const resetTouchHandler = () => {
    document.removeEventListener('touchstart', onTouchStart);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
};
