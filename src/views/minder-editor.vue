<!-- 脑图编辑器 demo -->
<template>
  <div>
    <minder-editor :progress-enable="false" :import-json="importJson" />
  </div>
</template>

<script>
export default {
  name: 'MinderEditorDemo',
  data() {
    return {
      importJson: {
        // 节点数据
        root: {
          data: {
            // 文本内容
            text: 'vue-minder-editor-extended',
            // 标签
            resource: ['模块1'],
            // 是否禁止修改
            disable: true,
            // 默认展开或折叠，默认是展开的，collapse 可设为折叠
            // expandState: 'collapse',
            // 在 disable 为 true 的情况下，允许添加标签
            tagEnable: true,
            // 在 disable 为 true 的情况下，允许删除节点
            allowDelete: true,
            // 在 disable 为 true 的情况下，允许添加标签，优先级比 tagEnable 高
            allowDisabledTag: true,
          },
          // 子节点
          children: [
            {
              data: {
                text: 'child1',
                disable: true,
                expandState: 'collapse',
                resource: ['模块2']
              },
              children: [
                {
                  data: {
                    text: 'child11',
                    disable: true,
                    resource: ['模块2']
                  },
                },
                {
                  data: {
                    text: 'child12',
                  }
                }
              ]
            },
            {
              data: {
                text: 'child2',
              }
            }
          ]
        },
      },
      tags:  ['模块1','模块2']
    }
  }
}
</script>
