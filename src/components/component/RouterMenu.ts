// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
// ================================================================================

export default defineComponent({
  setup() {
    // ------------------------------------------------------------------------------
    // * Vue
    // ------------------------------------------------------------------------------
    const _router = useRouter();
    // ------------------------------------------------------------------------------
    // * Interface
    // ------------------------------------------------------------------------------
    interface RouterMenuItem {
      path: string;
      name: string;
      icon: string;
      description: string;
    }
    // ------------------------------------------------------------------------------
    // * Option
    // ------------------------------------------------------------------------------
    const routerItemList = computed<RouterMenuItem[]>(() => _router.getRoutes().filter(p => p.path.includes('module')).map(p => {
      return {
        path: p.path,
        name: p.name?.toString() || '无标题',
        icon: p.meta.icon?.toString() || 'mdi-apps',
        description: p.meta.description?.toString() || '无描述',
      }
    }));
    // ------------------------------------------------------------------------------
    // * Function
    // ------------------------------------------------------------------------------

    return {
      // ------------------------------------------------------------------------------
      // * Option
      // ------------------------------------------------------------------------------
      routerItemList
      // ------------------------------------------------------------------------------
      // * Function
      // ------------------------------------------------------------------------------
    }
  }
});