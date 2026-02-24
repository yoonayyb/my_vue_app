import { App } from 'vue';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import 'xe-utils';

export function useVxeTable(app: App) {
  app.use(VXETable);

  // 全局配置
  VXETable.setup({
    table: {
      border: true,
      stripe: true,
      resizable: true,
      showOverflow: true,
    },
  });
}
