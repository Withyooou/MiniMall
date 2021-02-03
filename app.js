// app.js
App({
  globalData: {
    cartList: []
  },
  addToCart(obj) {
    // find()用于找出第一个符合条件的数组成员,没有则返回undefined
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if(oldInfo) {
      // 曾经添加过购物车,商品数量+1
      oldInfo.count += 1
      wx.showToast({
        title: '商品数量 +1',
        duration: 1000,
      })
    } else {
      // 第一次加入购物车,商品数量为1,并选中
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
      wx.showToast({
        title: '成功添加购物车',
        duration: 1000,
      })
    } 

    // 购物车回调函数(确保及时更新cart页面的数据)
    if(this.addCartCallback) {
      this.addCartCallback()
    }
  },
})
