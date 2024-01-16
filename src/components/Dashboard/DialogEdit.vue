<!-- Dashboard 新建/编辑/复制仪表盘 Dialog -->
<template>
  <el-dialog
    :title="dialogTitle"
    custom-class="dashboard-edit-dialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    width="500px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="96px"
      label-position="left"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="紧凑布局" prop="compact" required>
            <template #label>
              <span>紧凑布局</span>
              <el-tooltip
                content="紧凑布局时，会压缩组件垂直间距"
                placement="bottom-start"
                :open-delay="500"
                :offset="-10"
              >
                <i class="el-icon-question" />
              </el-tooltip>
            </template>
            <el-switch v-model="form.compact" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="侧栏位置" prop="aside" required>
            <el-radio-group v-model="form.aside">
              <el-radio label="left">左侧</el-radio>
              <el-radio label="right">右侧</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="id" style="display:none;" />
      <el-form-item prop="route" style="display:none;" />
      <el-form-item prop="layout" style="display:none;" />
    </el-form>
    <div slot="footer">
      <el-button icon="el-icon-close" size="medium" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" icon="el-icon-check" size="medium" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import dashboardAPI from '@/api/dashboard'

export default {
  name: 'DashboardEditDialog',
  inject: ['$dashboard'],
  data() {
    return {
      dialogVisible: false,
      type: 'new',
      loading: false,
      form: {
        id: 0,
        route: this.$route.name,
        name: '',
        layout: null, // 新建时不需要传，便于后续赋默认值
        aside: 'right',
        compact: true,
      },
      rules: {
        name: [
          { required: true, message: '请输入仪表盘名称', trigger: 'change' },
          { max: 20, message: '名称不能超过 20 个字符', trigger: 'change' },
        ],
      },
    }
  },
  computed: {
    dialogTitle() {
      if (this.type === 'edit') {
        return '编辑仪表盘'
      }
      if (this.type === 'copy') {
        return '复制仪表盘'
      }
      return '新建仪表盘'
    },
    /**
     * 获取保存的数据
     * @HACK 后端接口需要 layout 字段为字符串
     */
    postData() {
      return {
        ...this.form,
        layout: JSON.stringify(this.form.layout),
      }
    },
  },
  methods: {
    /**
     * 显示 Dialog
     * @param {String} type 类型，可选值：'new'、'edit'、'copy'
     * @param {Object} [dashboard] 仪表盘数据
     */
    show(type, dashboard) {
      this.type = type
      if (type !== 'new') {
        this.form = {
          ...this.form,
          ...dashboard,
          id: type === 'edit' ? dashboard.id : 0,
        }
      }
      this.dialogVisible = true
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submit()
        }
      })
    },
    submit() {
      // eslint-disable-next-line no-unused-vars
      const apiMethod = this.form.id ? 'update' : 'add'
      this.loading = true
      // dashboardAPI[apiMethod](this.postData).then(res => {
      //   this.loading = false
      //   if (res.code === 200) {
      //     // 将新增的仪表盘设置为选中
      //     if (apiMethod === 'add') {
      //       this.$store.dispatch('dashboard/setSelected', {
      //         id: res.data,
      //         route: this.$route.name,
      //       })
      //     }
      //     this.$dashboard.notify(`仪表盘${apiMethod === 'add' ? '新建' : '编辑'}成功！`)
      //     // 通知父组件刷新 Dashboard 列表
      //     this.$emit('refresh')
      //     this.$refs.form.resetFields()
      //     this.dialogVisible = false
      //   }
      // })
    },
  }
}
</script>

<style>
::v-deep .dashboard-edit-dialog {
  border-radius: 4px;
}
</style>
