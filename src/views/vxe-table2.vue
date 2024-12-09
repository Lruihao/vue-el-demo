<!-- vxe-table custom col -->
<template>
  <div>
    <vxe-toolbar ref="toolbarRef" custom />
    <vxe-table
      id="myCustomStorage"
      ref="tableRef"
      :custom-config="customConfig"
      :data="tableData"
    >
      <vxe-column type="seq" width="70" />
      <vxe-column field="name" title="Name" />
      <vxe-column field="role" title="role" />
      <vxe-column field="sex" title="Sex" />
      <vxe-column field="age" title="Age" />
      <vxe-column field="address" title="address" />
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    const tableData = [
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
    ]
    const customConfig = {
      storage: true
    }
    return {
      tableData,
      customConfig
    }
  },
  mounted () {
    const $table = this.$refs.tableRef
    const $toolbar = this.$refs.toolbarRef
    if ($table && $toolbar) {
      $table.connect($toolbar)
    }
  }
}
</script>
