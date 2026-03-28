import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  resolve: {
    atomDirs: [{ type: 'component', dir: 'src/components' }],
  },
  themeConfig: {
    name: 'Mobile Kit',
    logo: false,
    nav: [
      { title: '指南', link: '/guide' },
      { title: '组件', link: '/components/button' },
    ],
  },
  alias: {
    '@joewrights/mobile-kit': '/src',
  },
  styles: [
    `
      :root {
        --adm-color-primary: #1677ff;
      }
      .dumi-default-header {
        border-bottom: 1px solid #f0f0f0;
        background: #fff;
      }
      .dumi-default-hero {
        background: linear-gradient(180deg, #f7faff 0%, #ffffff 100%);
      }
    `,
  ],
});
