# API

## createNoScroll

Create a new `noscroll` instance. This is only necessary if you plan to modify the default behavior. In other cases, simply import the methods directly from `@fluejs/noscroll`.

```ts
function createNoScroll(
    options?: NoScrollOptions
): {
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
}

interface NoScrollOptions {
    // When scroll is disabled, we listen to the resize event to recalculate the scrollbar width
    noHandleWindowResize?: boolean;
    windowResizeThrottle?: number;
    // Called each time the scrollbar is disabled
    onScrollDisable?: (target: HTMLElement) => void;
    // Called each time the scrollbar is enabled
    onScrollEnable?: (target: HTMLElement) => void;
    // Called the first time the scrollbar is disabled
    onInitScrollDisable?: () => void;
    // Called the last time the scrollbar is enabled
    onResetScrollDisable?: () => void;
}
```

## disableScroll

```ts
function disableScroll(
    target: HTMLElement,
    options?: {
        scrollbarWidthAdjustment?: boolean, // default: true
    }
): void
```

Disable scroll for target element

## enableScroll

```ts
function enableScroll(target: HTMLElement): void
```

Enable scroll for target element

## disablePageScroll

```ts
function disablePageScroll(): void
```

Disable page scroll

## enablePageScroll

```ts
function disablePageScroll(): void
```

Enable page scroll

## adjustScrollbarWidth

```ts
function adjustScrollbarWidth(target: HTMLElement | HTMLElement[]): void
```

Adjust scrollbar width with padding

## removeScrollbarWidthAdjustment

```ts
function removeScrollbarWidthAdjustment(target: HTMLElement | HTMLElement[]): void
```

Remove scrollbar width adjustment

## updateAllScrollbarWidthAdjustment

```ts
function updateAllScrollbarWidthAdjustment(): void
```

Update all scrollbar width adjustments

## pageScrollIsDisabled

```ts
function pageScrollIsDisabled(): boolean
```

## markScrollable

```ts
function markScrollable(target: HTMLElement | HTMLElement[]): boolean
```

Mark element scrollable. Useful with [noscroll/touch](/guide#handle-touch-events);

## unmarkScrollable

```ts
function unmarkScrollable(target: HTMLElement | HTMLElement[]): boolean
```

Unmark element scrollable. Useful with [noscroll/touch](/guide#handle-touch-events);

## createPageScrollToggler

```ts
function createPageScrollToggler(): {
    disablePageScroll: () => void;
    enablePageScroll: () => void;
    togglePageScroll: () => void;
}
```

Useful when you want to create a toggle for enabling/disabling page scroll. Also, calls to enable/disable page scroll from the global API are stacked, meaning the current methods will be executed only once.

## usePageScrollToggle

```ts
function usePageScrollToggle(
    isDisabled?: MaybeRefOrGetter<boolean>,
    options?: {
        // The page scroll will be disabled if isDisabled is true during initialization
        immdiate?: boolean,
        // Useful if you need to use the toggler from your own createNoScroll
        toggler?: typeof createPageScrollToggler
    }
): void
```

Page scroll toggler composable function for Vue

```ts
import {usePageScrollToggle} from '@fluejs/noscroll/vue';

usePageScrollToggle(...);
```