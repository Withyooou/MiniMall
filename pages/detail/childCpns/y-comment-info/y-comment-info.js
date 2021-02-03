// pages/detail/childCpns/y-comment-info/y-comment-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentInfo: {
      type: Object,
      value: {}
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMore() {
      wx.showToast({
        title: '暂无数据...',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  }
})
