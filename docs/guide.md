<script setup>
import PageScrollExample from './components/PageScrollExample.vue';
import ElementScrollExample from './components/ElementScrollExample.vue';
import ElementScrollExampleAbs from './components/ElementScrollExampleAbs.vue';
</script>

# Guide

## What is `noscroll`?

This is a new, TypeScript-based and improved version of the [scroll-lock](https://github.com/FL3NKEY/scroll-lock) library, designed to address issues like content shifting and quirks in iOS Safari when disabling scrollbar on web pages.

## Installation

### Via package manager

::: code-group

```shell [npm]
npm install --save-dev @fluejs/noscroll
```

```shell [yarn]
yarn add -D @fluejs/noscroll
```

:::

That's it! Now you can use `@fluejs/noscroll`.

## Disable page scroll

A simple example of disabling the scrollbar on a page.

> [!NOTE]
> [scroll-lock](https://github.com/FL3NKEY/scroll-lock) was initially implemented to handle touch events because iOS Safari did not properly handle `overflow: hidden` on `body` DOM element. Starting with `iOS 15`, Safari now supports the CSS property `overflow: hidden`, and `@fluejs/noscroll` no longer handles touch events.
> 
> In any case, if you are still not satisfied with the current behavior in iOS Safari, you can use [noscroll/touch](#handle-touch-events) or implement your own touch event handler using [createNoScroll](/api#createNoScroll).

:::tabs
== Example
<PageScrollExample />
== Code
```ts
import {disablePageScroll, enablePageScroll} from '@fluejs/noscroll';

// disable page scroll
disablePageScroll();

// enable page scroll
enablePageScroll();
```
:::

## Disable element scroll

There is also an option to disable the scrollbar on target elements. But how is this different from the usual `overflow: hidden`? In this case, the library helps prevent content shifting caused by the scrollbar's width.

:::tabs
== Example
<ElementScrollExample />
== Code
```ts
import {disableScroll, enableScroll} from '@fluejs/noscroll';

const el = document.querySelector<HTMLElement>('some-element-selector');

// disable element scroll
disableScroll(el);

// disable element scroll without scrollbar width adjustment
disableScroll(el, {
    scrollbarWidthAdjustment: false,
});

// enable element scroll
enableScroll(el);
```
:::

## Adjust scrollbar width

You may also need to adjust the scrollbar width for other elements, such as those with `position: fixed/absolute`, which can shift due to the scrollbar of parent. An additional padding is applied to the element based on the width of the scrollbar.

:::tabs
== Example
<ElementScrollExampleAbs />
== Code

```ts
import {adjustScrollbarWidth} from '@fluejs/noscroll';

const el = document.querySelector<HTMLElement>('some-element-selector');

// adjust scrollbar width on element
adjustScrollbarWidth(el);
```

Or via CSS variable `--noscroll-target-scrollbar-width`

```css
.my-fixed-element {
    max-width: calc(100% - var(--noscroll-target-scrollbar-width), 0px);
}
```
:::

## Handle touch events

If you're still not satisfied with the current behavior in iOS Safari, you can use the `noscroll/touch` module. When the page scroll is disabled using `disablePageScroll`, this module overrides the default browser behavior for touch events and implements its own behavior, which helps to minimize the peculiarities of iOS Safari and other touch devices.

```ts
import {createNoScroll, markScrollable} from '@fluejs/noscroll';
import {initTouchHandler, resetTouchHander} from '@fluejs/noscroll/touch';

const scrollable = document.querySelector<HTMLElement>('some-scrollable-selector');

// you must mark scrollable element
markScrollable(scrollable);

// create new noscroll instance with touch handlers
const {
    disablePageScroll,
    enablePageScroll,
} = createNoScroll({
    onInitScrollDisable: initTouchHandler,
    onResetScrollDisable: resetTouchHander,
});

// disable page scroll
disablePageScroll();

// enable page scroll
disablePageScroll();
```

## Using with Vue

`noscroll/vue` is a small wrapper for Vue that makes it more convenient to work with the library.

```vue
<template>
    <!-- adjust scrollbar width directive -->
    <div v-adjust-scrollbar-width></div>
    <!-- mark scrollable directive -->
    <div v-mark-scrollable></div>
</template>

<script setup lang="ts">
import {
    vAdjustScrollbarWidth,
    vMarkScrollable,
    usePageScrollToggle,
} from '@fluejs/noscroll/vue';
import {ref} from 'vue';

const isPageScrollDisabled = ref(false);

// pass ref
usePageScrollToggle(isPageScrollDisabled);

// disable page scroll
isPageScrollDisabled.value = true;

// enable page scroll
isPageScrollDisabled.value = false;
</script>
```