import request from '@/utils/request'

export default {
  /**
   * 通过 route 获取 dashboard 数组（后端自动获取组织 ID）
   * @param {Object} data
   * @param {String} data.route 仪表盘路由
   * @returns
   */
  get: data => {
    return request({
      url: '/dashboard/get',
      method: 'post',
      data
    })
  },
  /**
   * 新增 dashboard
   * @param {Object} data
   * @param {String} data.name 仪表盘名称
   * @param {String} data.route 仪表盘路由
   * @param {Array} data.layout 仪表盘布局
   * @param {String} data.aside 仪表盘侧边栏 left | right
   * @param {Boolean} data.compact 仪表盘是否垂直压缩高度
   * @returns
   */
  add: data => {
    return request({
      url: '/dashboard/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新 dashboard
   * @param {Object} data
   * @param {Number} data.id 仪表盘 id
   * @param {String} data.name 仪表盘名称
   * @param {String} data.route 仪表盘路由
   * @param {Array} data.layout 仪表盘布局
   * @param {String} data.aside 仪表盘侧边栏 left | right
   * @param {Boolean} data.compact 仪表盘是否垂直压缩高度
   * @returns
   */
  update: data => {
    return request({
      url: '/dashboard/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除 dashboard
   * @param {Number} id 仪表盘 id
   * @returns
   */
  delete: id => {
    return request({
      url: `/dashboard/delete/${id}`,
      method: 'post',
    })
  },
}
