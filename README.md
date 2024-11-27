# @fluejs/noscroll

[<img src="https://pkg-size.dev/badge/bundle/4459">](https://pkg-size.dev/@fluejs%2Fnoscroll)
[<img src="https://img.shields.io/npm/v/@fluejs/noscroll.svg">](https://www.npmjs.com/package/@fluejs/noscroll)
<img src="https://img.shields.io/npm/l/@fluejs/noscroll">

TypeScript-based and improved version of the [scroll-lock](https://github.com/FL3NKEY/scroll-lock) library, designed to address issues like content shifting and quirks in iOS Safari when disabling scrollbar on web pages.

[Documentation & demo](https://noscroll.fl3nkey.com/)

## Installation

```shell
# npm
npm install --save-dev @fluejs/noscroll

# yarn
yarn add -D @fluejs/noscroll
```

```ts
import {disablePageScroll, enablePageScroll} from '@fluejs/noscroll';

// disable page scroll
disablePageScroll();

// enable page scroll
enablePageScroll();
```