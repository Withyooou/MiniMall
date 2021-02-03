// pages/cart/childCpns/y-cart-list-item/y-cart-list-item.js
const app = getApp()

Component({
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },
  data: {

  },
  methods: {
    onCheckClick(e) {
      // 1.查找到对应的商品(找到返回对象,找不到返回undefined),并修改选中状态
      const goods = app.globalData.cartList.find(item => item.iid === this.properties.goods.iid)
      goods.checked = !goods.checked
      
      // 2.获取当前商品的index
      const index = e.currentTarget.dataset.index;

      // 3.回调
      app.changeGoodsState(index, goods)
    },
    handleTap() {
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + this.properties.goods.iid,
      })
    },
    handleLongPress() {
      // 获取当前商品的iid(用于寻找要删除的对象在数组中的索引)
      const iid = this.properties.goods.iid;
      this.triggerEvent("longpress", {iid: iid}, {})
    }
  }
})
