// components/y-goods-item/y-goods-item.js
Component({
  properties: {
    goodsitem: {
      type: Object,
      value: {}
    }
  },
  data: {

  },
  methods: {
    itemClick(e) {
      // 1.获取iid
      const iid = this.data.goodsitem.iid;
      if(iid) {
        // 2.iid不为undefined,跳转到对应的路径
        wx.navigateTo({
          url: '/pages/detail/detail?iid=' + iid,
        })
      } else {
        wx.showToast({
          title: 'empty data',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }
  }
})
