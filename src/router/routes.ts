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
  {
    path: '/module/alipay-nfc-tag-writer',
    name: '支付宝碰一碰',
    component: () => import('pages/module/alipay-nfc-tag-writer/AlipayNFCTagWriter.vue'),
    meta: { icon: 'mdi-nfc', description: '快速生成支付宝碰一碰 NFC Tag' }
  },
  {
    path: '/module/blue-archive-nfc-launch',
    name: '蔚蓝档案，启动！',
    component: () => import('pages/module/blue-archive-nfc-launch/BlueArchiveNFCLaunch.vue'),
    meta: { icon: 'mdi-rocket-launch-outline', description: '制作蔚蓝档案 NFC 启动卡' }
  },
  {
    path: '/module/good-display-nfc-e-paper',
    name: '智能价签写入',
    component: () => import('pages/module/good-display-nfc-e-paper/GoodDisplayNFCePaper.vue'),
    meta: { icon: 'mdi-cash-multiple', description: '更新智能 NFC 价签' }
  },
  {
    path: '/module/electronic-menu',
    name: '电子菜单',
    component: () => import('pages/module/electronic-menu/ElectronicMenu.vue'),
    meta: { icon: 'mdi-receipt-text-outline', description: '在漫展现场展示电子菜单' }
  },
  {
    path: '/module/randomizer',
    name: '随机数生成器',
    component: () => import('pages/module/randomizer/RandomizerPage.vue'),
    meta: { icon: 'mdi-ticket', description: '使用来自大气噪音的真随机进行抽奖' }
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
