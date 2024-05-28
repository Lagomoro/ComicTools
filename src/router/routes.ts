import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '主页',
    component: () => import('pages/IndexPage.vue'),
  },

  {
    path: '/module/image-cutter',
    name: '一键摊宣',
    component: () => import('pages/module/image-cutter/ImageCutter.vue'),
    meta: { icon: 'mdi-apps', description: '支持九宫格和长图导出' }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: '404 Not Found',
    component: () => import('src/pages/ErrorNotFoundPage.vue'),
  },
];

export default routes;
