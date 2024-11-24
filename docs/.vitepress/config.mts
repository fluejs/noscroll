import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';

export default defineConfig({
    appearance: 'dark',
    title: '@fluejs/noscroll',
    description: 'Disable scrollbar on your web-page',
    markdown: {
        config(md) {
            md.use(tabsMarkdownPlugin);
        },
    },
    themeConfig: {
        nav: [
            {
                text: 'Home',
                link: '/',
            },
            {
                text: 'Guide',
                link: '/guide',
            },
            {
                text: 'API',
                link: '/api',
            },
        ],
        socialLinks: [{
            icon: 'github',
            link: 'https://github.com/fluejs/noscroll',
        }],
    },
});
