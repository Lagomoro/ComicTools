import { boot } from 'quasar/wrappers';

// Masonry
import { VueMasonryPlugin } from 'vue-masonry';

export default boot(({ app }) => {
  app.use(VueMasonryPlugin)
});
