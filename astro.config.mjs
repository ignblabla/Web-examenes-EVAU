import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import rehypeKatex from 'rehype-katex';
import remarkPevau from './src/lib/remark-pevau.mjs';

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, remarkPevau],
    rehypePlugins: [[rehypeKatex, { strict: false, output: 'htmlAndMathml' }]],
  },
});
