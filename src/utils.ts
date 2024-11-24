const isBody = (target: HTMLElement) => target === document.body;

export const attrAsSelector = (attr: string) => `[${attr}]`;

export const getScrollbarWidth = (target: HTMLElement) => {
    if (isBody(target)) {
        const documentWidth = document.documentElement.clientWidth;
        const windowWidth = window.innerWidth;

        return windowWidth - documentWidth;
    }

    const borderLeftWidthSavedValue = target.style.borderLeftWidth;
    const borderRightWidthSavedValue = target.style.borderRightWidth;

    target.style.borderLeftWidth = '0px';
    target.style.borderRightWidth = '0px';

    const scrollbarWidth = target.offsetWidth - target.clientWidth;

    target.style.borderLeftWidth = borderLeftWidthSavedValue;
    target.style.borderRightWidth = borderRightWidthSavedValue;

    return scrollbarWidth;
};

export const asArray = <T>(data: T | T[]) => {
    if (Array.isArray(data)) {
        return data;
    }

    return [data];
};

export function throttle<T extends unknown[]>(fn: (...args: T) => void, wait: number) {
    let inThrottle: boolean;
    let lastFn: ReturnType<typeof setTimeout>;
    let lastTime: number;

    return (...args: T) => {
        if (!inThrottle) {
            fn(...args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastTime >= wait) {
                    fn(...args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
}

export const createQueue = (
    onInit: () => void,
    onReset: () => void,
    onClear?: () => void,
) => {
    let counter = 0;
    let isInitCalled = false;

    const init = () => {
        if (counter <= 0) {
            onInit();
            isInitCalled = true;
        }

        counter += 1;
    };

    const reset = () => {
        if (counter > 0) {
            counter -= 1;
        }

        if (counter <= 0 && isInitCalled) {
            onReset();
        }
    };

    const clearAndReset = () => {
        counter = 0;
        isInitCalled = false;

        onClear?.();
        onReset();
    };

    const initIsCalled = () => isInitCalled;

    return {
        init,
        reset,
        clearAndReset,
        initIsCalled,
    };
};
