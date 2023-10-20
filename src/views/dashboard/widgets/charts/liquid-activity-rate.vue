<!-- App 稳定性测试 Activity 覆盖率组件 -->
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
    <LiquidChart
      ref="liquidChart"
      v-loading="loading"
      class="chart-box"
      v-bind="liquidConfig"
    />

    <el-dialog
      custom-class="dialog-setting"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      width="400px"
    >
      <div slot="title">
        <div class="el-dialog__title">配置组件</div>
        <small class="text-info">{{ title }}</small>
      </div>
      <el-form ref="form" label-position="top">
        <el-form-item label="指定APP">
          <el-select
            v-model="appIds"
            multiple
            clearable
            collapse-tags
            placeholder="请选择APP名称"
            style="width: 350px;"
          >
            <el-option
              v-for="item in appListOptions"
              :key="item.id"
              :label="`${item.name} V${item.version}`"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
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
import { LiquidChart } from '@opd/g2plot-vue'
import moment from 'moment'
moment.locale('zh-cn')
moment.defaultFormat = 'YYYY-MM-DD'

const today = moment().format()

export default {
  /**
   * 组件名称，必须且唯一
   */
  name: 'AppActivityRateLiquidWidget',
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
    name: 'App 稳定性测试 Activity 覆盖率',
    icon: 'liquid',
    params: {
      appIds: [],
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
    LiquidChart,
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
      title: 'App 稳定性测试 Activity 覆盖率',
      loading: false,
      dialogVisible: false,
      appIds: [],
      dateRange: ['', ''],
      selected: 'all',
      settingSelected: 'all',
      appListOptions: [],
      liquidConfig: {
        percent: 0,
        radius: 0.9,
        outline: {
          border: 2,
          distance: 4,
        },
        statistic: {
          title: {
            offsetY: -8,
            formatter: () => '平均 Activity 覆盖率',
            style: ({ percent }) => ({
              fontSize: 14,
              fill: percent < 0.6 ? '#919191' : 'white',
            }),
          },
          content: {
            style: ({ percent }) => ({
              fontSize: 30,
              fill: percent < 0.5 ? 'rgba(44, 53, 66, 0.85)' : 'white',
            }),
          },
        },
        liquidStyle: ({ percent }) => ({
          fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
          stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
        }),
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
  created() {
    this.getAPPList()
  },
  mounted() {
    this.dateRange = [...this.params.dateRange]
    this.selected = this.params.selected
    this.settingSelected = this.params.selected
    this.appIds = this.params.appIds
    this.getMonkeyActivityRate()
  },
  refresh() {
    this.getMonkeyActivityRate()
  },
  setting() {
    this.dialogVisible = true
    this.getAPPList()
  },
  methods: {
    getAPPList() {
      this.appListOptions = [
        {
          'id': 1,
          'name': '咪咕阅读',
          'version': '8.70.1'
        },
        {
          'id': 2,
          'name': '咪咕阅读',
          'version': '8.71.0'
        },
        {
          'id': 3,
          'name': 'TestCrash',
          'version': '2.0'
        },
        {
          'id': 4,
          'name': '咪咕阅读',
          'version': '8.72.0'
        },
        {
          'id': 5,
          'name': '优酷视频',
          'version': '10.2.22'
        },
        {
          'id': 6,
          'name': '优酷视频',
          'version': '10.2.57'
        },
        {
          'id': 7,
          'name': '抖音',
          'version': '25.4.0'
        },
        {
          'id': 8,
          'name': '咪咕阅读',
          'version': '9.5.0'
        }
      ]
    },
    getMonkeyActivityRate() {
      this.loading = true
      const params = {
        appIds: this.appIds.join(','),
        startDate: '',
        endDate: '',
      }
      if (this.dateRange && this.dateRange.length === 2) {
        params.startDate = this.dateRange[0]
        params.endDate = this.dateRange[1]
      }
      this.loading = false
      // fake data for testing
      this.liquidConfig.percent = Math.random()
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
          appIds: this.appIds,
          dateRange: this.dateRange,
          selected: this.selected,
        })
      }
      this.getMonkeyActivityRate()
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
</style>
