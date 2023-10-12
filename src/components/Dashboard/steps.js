export default [
  {
    element: '.dashboard-operations:last-child',
    popover: {
      title: '展开组件列表',
      description: '点击管理组件按钮展开侧栏组件列表',
      showButtons: ['next', 'close'],
    }
  },
  {
    element: '.dashboard-container .dashboard-aside',
    popover: {
      title: '添加组件',
      description: `点击组件的添加按钮
        <button type="button" class="el-button el-button--default el-button--mini is-circle">
          <i class="el-icon-plus"></i>
        </button>
        或者拖拽组件放置到容器中即可。`,
    }
  },
  {
    element: '.dashboard-container .dashboard-main',
    popover: {
      title: '改变位置',
      description: '鼠标 <i class="el-icon-rank" /> 按住组件即可拖拽调整组件位置。',
    }
  },
  {
    element: '.dashboard-container .vue-grid-item:first-child',
    popover: {
      title: '调整大小',
      description: '鼠标移动到组件右下角，鼠标会变成可调整大小的图标 <i class="el-icon-bottom-right"></i>，此时按住鼠标左键即可调整组件大小。',
      align: 'end',
    }
  },
  {
    element: '.dashboard-container .vue-grid-item:first-child',
    popover: {
      title: '配置组件',
      description: `鼠标移动到组件上，组件右上角会出现操作按钮组
        <div class="el-button-group">
          <button type="button" class="el-button el-button--success el-button--medium" title="刷新组件" style="padding: 2px 4px;">
            <i class="el-icon-refresh"></i>
          </button>
          <button type="button" class="el-button el-button--primary el-button--medium" title="配置组件" style="padding: 2px 4px;">
            <i class="el-icon-setting"></i>
          </button>
          <button type="button" class="el-button el-button--danger el-button--medium" title="删除组件" style="padding: 2px 4px;">
            <i class="el-icon-close"></i>
          </button>
        </div>。`,
      align: 'start',
    },
  },
  {
    element: '.dashboard-container',
    popover: {
      title: '侧栏位置',
      description: '鼠标按住侧栏任意空白处，拖拽侧栏到页面左侧或右侧然后放下即可改变侧栏位置。',
    }
  },
  {
    element: '.dashboard-operations:last-child',
    popover: {
      title: '更多操作',
      description: '鼠标移动到图标上 <i class="el-icon-arrow-down"></i> 时，会出现紧凑布局开关、刷新、清空等更多操作，点击最右侧按钮可全屏显示。',
    }
  },
  {
    element: '.dashboard-container .dashboard-aside .dashboard-close-btn',
    popover: {
      title: '恭喜完成 🎉',
      description: '现在你可以尝试自定义一个仪表盘啦！',
      showButtons: ['next'],
    }
  }
]
