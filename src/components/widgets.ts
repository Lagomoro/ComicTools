// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { Component, ComputedOptions, MethodOptions } from 'vue';
// --------------------------------------------------------------------------------
import FileDropArea from 'src/components/widgets/FileDropArea.vue';
// ================================================================================

export const widgets: Record<string, Component<any, any, any, ComputedOptions, MethodOptions>> = {
  'm-file-drop-area': FileDropArea,
}
