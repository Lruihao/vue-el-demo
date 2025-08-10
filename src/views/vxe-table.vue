<!-- vxe-table -->
<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="getSelectedEvent">获取选中</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
        <vxe-button @click="revertEvent">还原</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      show-overflow
      keep-source
      :data="tableData"
      :checkbox-config="{range: true}"
      :mouse-config="{selected: true}"
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, isChecked: true}"
      :scroll-y="{enabled: true, gt: 20}"
      :edit-config="{trigger: 'dblclick', mode: 'cell', showStatus: true, icon: 'el-icon-edit'}"
    >
      <vxe-column type="checkbox" width="60" />
      <vxe-column type="seq" width="60" />
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}">
        <template #default="{ row }">
          <span>custom: {{ row.name }}</span>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}" />
      <vxe-column field="address" title="Address" :edit-render="{name: 'input'}" />
    </vxe-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: '鸿星尔克', role: 'Develop', sex: '0', age: 28, address: '北京' },
        { id: 10002, name: '蜜雪冰城', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Cell', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Summer', role: 'Designer', sex: '1', age: 23, address: '青岛' },
        { id: 10005, name: '拿来吧你', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'zhaoey', role: 'Designer', sex: '1', age: 21, address: '大连' }
      ],
      sexList: [
        { label: '', value: '' },
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ]
    }
  },
  methods: {
    insertEvent () {
      const $table = this.$refs.xTable
      $table.insert().then(({ row }) => {
        $table.setEditCell(row, 'name')
      })
      // this.tableData.push({ id: 10007, name: '新数据', role: 'Develop', sex: '0', age: 28, address: '北京' })
    },
    getSelectedEvent() {
      const $table = this.$refs.xTable
      const selectedRecords = $table.getCheckboxRecords()
      this.$message(JSON.stringify(selectedRecords))
    },
    getInsertEvent () {
      const $table = this.$refs.xTable
      const insertRecords = $table.getInsertRecords()
      this.$message(JSON.stringify(insertRecords))
    },
    getRemoveEvent () {
      const $table = this.$refs.xTable
      const removeRecords = $table.getRemoveRecords()
      this.$message(JSON.stringify(removeRecords))
    },
    getUpdateEvent () {
      const $table = this.$refs.xTable
      const updateRecords = $table.getUpdateRecords()
      this.$message(JSON.stringify(updateRecords))
      console.log(this.tableData[0].name)
    },
    revertEvent () {
      this.$refs.xTable.revertData()
    }
  }
}
</script>

<style scoped>

</style>
