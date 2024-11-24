export interface NoScrollOptions {
    noHandleWindowResize?: boolean;
    windowResizeThrottle?: number;
    onScrollDisable?: (target: HTMLElement) => void;
    onScrollEnable?: (target: HTMLElement) => void;
    onInitScrollDisable?: () => void;
    onResetScrollDisable?: () => void;
}
