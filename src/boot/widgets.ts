import { boot } from 'quasar/wrappers'

// Widgets
import { widgets } from 'src/components/widgets';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ( { app } ) => {
  // something to do
  for(const key in widgets) {
    app.component(key, widgets[key]);
  }
})
