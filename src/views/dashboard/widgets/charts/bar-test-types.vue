<!-- App 稳定性测试类型分布组件 -->
<template>
  <el-card>
    <div class="chart-header">
      <span class="chart-title" :title="title">{{ title }}</span>
      <el-dropdown
        trigger="click"
        placement="bottom"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <span>{{ pickerDropdown.find(item => item.command === selected).text }}</span>
          <i class="el-icon-arrow-down" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in pickerDropdown"
            :key="item.command"
            :command="item.command"
          >
            {{ item.text }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <BarChart
      v-if="data[0].value || data[1].value || data[2].value"
      ref="barChart"
      v-loading="loading"
      class="chart-box"
      v-bind="barConfig"
      :data="data"
    />
    <el-empty v-else :image-size="120" class="chart-empty" />

    <el-dialog
      title="选择统计范围"
      custom-class="dialog-setting"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      width="400px"
    >
      <el-form ref="form" label-position="top">
        <el-form-item label="日期范围" prop="">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :editable="false"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button icon="el-icon-close" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="save(settingSelected || 'custom')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { BarChart } from '@opd/g2plot-vue'
import moment from 'moment'
moment.locale('zh-cn')
moment.defaultFormat = 'YYYY-MM-DD'

const today = moment().format()

export default {
  /**
   * 组件名称，必须且唯一
   */
  name: 'AppTestTypesBarWidget',
  /**
   * 组件配置对象
   * @property {String} name 组件名称，用于在组件列表中显示组件名称
   * @property {String} [icon] 组件图标，用于在组件列表中显示组件图标
   * @property {Object} [params] 组件参数，不设置则不会显示配置按钮
   * @property {Boolean} [hidden] 是否隐藏组件，设置为 true 则不会在组件列表中显示
   * 以下参数参考 https://jbaysolutions.github.io/vue-grid-layout/zh/guide/properties.html#griditem
   * @property {Number} w 组件宽度
   * @property {Number} h 组件高度
   * @property {Number} [minW] 组件最小宽度
   * @property {Number} [minH] 组件最小高度
   * @property {Number} [maxW] 组件最大宽度
   * @property {Number} [maxH] 组件最大高度
   * @property {Boolean} [isResizable] 是否可调整大小
   */
  widget: {
    name: 'App 稳定性测试类型分布',
    icon: 'h-bar',
    params: {
      dateRange: ['', ''],
      selected: 'all',
    },
    w: 6,
    h: 6,
    minW: 6,
    minH: 6,
    maxW: 12,
    maxH: 8,
    isResizable: true,
  },
  components: {
    BarChart,
  },
  inject: ['$dashboard'],
  props: {
    /**
     * 组件参数，用于接收用户已配置的参数
     */
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      title: 'App 稳定性测试类型分布',
      loading: false,
      dialogVisible: false,
      dateRange: ['', ''],
      selected: 'all',
      settingSelected: 'all',
      typeName: {
        ztest: '智能 Monkey',
        monkey: '原生 Monkey',
        manual: '人工测试',
      },
      data: [
        { type: 'ztest', value: 0 },
        { type: 'monkey', value: 0 },
        { type: 'manual', value: 0 },
      ],
      barConfig: {
        xField: 'value',
        yField: 'type',
        xAxis: false,
        yAxis: false,
        seriesField: 'type',
        legend: {
          position: 'top-left',
          marker: {
            symbol: 'square',
          },
          itemName: { formatter: (text) => this.typeName[text] },
          itemSpacing: 10,
        },
        barWidthRatio: 0.5,
        label: { content: (item) => `${item.value}次` },
        tooltip: {
          fields: ['type', 'value'],
          formatter: (datum) => {
            return {
              title: false,
              name: this.typeName[datum.type],
              value: `${datum.value}次`,
            }
          },
        },
        colorField: 'type',
        color: ['#6395FA', '#65DAAB', '#7566FB'],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近 7 天',
            onClick: (picker) => {
              picker.$emit('pick', [moment().subtract(7, 'days').format(), today])
              this.settingSelected = 'last7'
            }
          },
          {
            text: '最近 30 天',
            onClick: (picker) => {
              picker.$emit('pick', [moment().subtract(30, 'days').format(), today])
              this.settingSelected = 'last30'
            }
          },
          {
            text: '本周',
            onClick: (picker) => {
              picker.$emit('pick', [moment().startOf('week').format(), today])
              this.settingSelected = 'week'
            }
          },
          {
            text: '本月',
            onClick: (picker) => {
              picker.$emit('pick', [moment().startOf('month').format(), today])
              this.settingSelected = 'month'
            }
          },
          {
            text: '最近三个月',
            onClick: (picker) => {
              picker.$emit('pick', [moment().subtract(3, 'months').format(), today])
              this.settingSelected = 'custom'
            }
          },
        ],
        onPick: () => {
          this.settingSelected = 'custom'
        },
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pickerDropdown: [
        { text: '不限时间', command: 'all' },
        { text: '最近 7 天', command: 'last7' },
        { text: '最近 30 天', command: 'last30' },
        { text: '本周', command: 'week' },
        { text: '本月', command: 'month' },
        { text: '自定义时间', command: 'custom' },
      ],
    }
  },
  watch: {
    dateRange(val) {
      if (!val || val.length !== 2) {
        this.settingSelected = 'all'
      }
    },
  },
  mounted() {
    this.dateRange = [...this.params.dateRange]
    this.selected = this.params.selected
    this.settingSelected = this.params.selected
    this.getMonkeyTestTypes()
  },
  refresh() {
    this.getMonkeyTestTypes()
  },
  setting() {
    this.dialogVisible = true
  },
  methods: {
    getMonkeyTestTypes() {
      this.loading = true
      const params = { startDate: '', endDate: ''  }
      if (this.dateRange && this.dateRange.length === 2) {
        params.startDate = this.dateRange[0]
        params.endDate = this.dateRange[1]
      }
      this.loading = false
      // fake data for testing
      for (const item of this.data) { item.value = Math.floor(Math.random() * 100) }
    },
    handleCommand(command) {
      switch (command) {
        case 'all':
          this.dateRange = ['', '']
          break
        case 'last7':
          this.dateRange = [moment().subtract(7, 'days').format(), today]
          break
        case 'last30':
          this.dateRange = [moment().subtract(30, 'days').format(), today]
          break
        case 'week':
          this.dateRange = [moment().startOf('week').format(), today]
          break
        case 'month':
          this.dateRange = [moment().startOf('month').format(), today]
          break
        case 'custom':
          this.dialogVisible = true
          break
      }
      if (command !== 'custom') {
        this.save(command)
      }
    },
    save(command) {
      this.selected = command
      if (!this.$dashboard.isCollapse) {
        this.$emit('update:params', {
          dateRange: this.dateRange,
          selected: this.selected,
        })
      }
      this.getMonkeyTestTypes()
      this.dialogVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chart-header {
  line-height: 1;
  font-size: 14px;
  margin-bottom: 1rem;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;

  .chart-title {
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-dropdown {
    flex-shrink: 0;
  }
}
.chart-box {
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
}
.chart-empty {
  padding-block: 20px;
  margin: auto;
}
</style>
