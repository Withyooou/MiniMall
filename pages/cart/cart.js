// pages/cart/cart.js
const app = getApp()

Page({
  data: {
    cartList: [],
    isSelectAll: false,
    totalPrice: 0,
    totalCounter: 0
  },
  onLoad() {
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })
    this.checkSellectAll()
    this.changeData()

    // 2.设置回调(这样一来每次添加商品之后,app.js便会调用addCartCallback(),及时更新cart.js中的数据)
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      // 状态更新
      this.checkSellectAll()
      this.changeData()
    }

    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 修改某一项(数组中的一个对象)的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })
      // 更新globalData中的数据
      app.globalData.cartList = this.data.cartList
      // 状态更新
      this.checkSellectAll()
      this.changeData()
    }
  },
  onShow() {
    wx.setNavigationBarTitle({
      // 购物车中的商品总数(无论是否选中)
      title: `购物车(${this.data.cartList.length})`,
    })
  },
  /************** 事件处理相关函数 ***************/
  changeData() {
    // 商品总价
    let totalPrice = 0;
    // 选中待结算的商品数量
    let counter = 0;

    // 遍历数组,计算价格
    for (let item of this.data.cartList) {
      if(item.checked) {
        counter ++;
        totalPrice += item.price * item.count;
      }
    }

    // 修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  },
  checkSellectAll() {
    if(app.globalData.cartList.length !== 0) {
      // 修改全部选中的状态(undefined取反为true,对象取反为false)
      const selectAll = !this.data.cartList.find(item => item.checked === false)
      this.setData({
        isSelectAll: selectAll
      })
    }
  },
  onSelectAll() {
    if(app.globalData.cartList.length !== 0) {
      console.log('点击了全选按钮')
      // 1.判断是否是全部选中
      if(this.data.isSelectAll) { // 目前全部选中,则全部取消
        this.data.cartList.forEach(item => {
          item.checked = false
        })
        this.setData({
          cartList: this.data.cartList,
          isSelectAll: false
        })
      } else { // 某些没选中,则全选
        this.data.cartList.forEach(item => {
          item.checked = true
        })
        this.setData({
          cartList: this.data.cartList,
          isSelectAll: true
        })
      }
      // 更新y-bottom-bar数据
      this.changeData()
      // 更新globalData中的数据
      app.globalData.cartList = this.data.cartList
    }
  },
  onLongPress(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除该商品吗？',
      success: (res) => {
        if(res.confirm) {
          const delId = e.detail.iid;
          const index = this.data.cartList.findIndex(item => item.iid === delId)
          // 删除数组中被长按的对象
          this.data.cartList.splice(index, 1);
          // y-bottom-bar是否全选的判定
          if(this.data.cartList.length === 0) {
            this.data.isSelectAll = false
          }
          this.setData({
            cartList: this.data.cartList,
            isSelectAll: this.data.isSelectAll
          })
          // 更新y-bottom-bar数据
          this.changeData()
          // 更新globalData中的数据
          app.globalData.cartList = this.data.cartList
          // 更新导航栏购物车商品总数
          wx.setNavigationBarTitle({
            title: `购物车(${this.data.cartList.length})`,
          })
        }
      }
    })
  },
  onClearAll() {
    if(app.globalData.cartList.length !== 0) {
      wx.showModal({
        title: '警告',
        content: '确认清空购物车？',
        success: (res) => {
          if(res.confirm) {
            this.setData({
              cartList: [],
              isSelectAll: false
            })
            // 更新y-bottom-bar数据
            this.changeData()
            // 更新globalData中的数据
            app.globalData.cartList = this.data.cartList
            // 更新导航栏购物车商品总数
            wx.setNavigationBarTitle({
              title: `购物车(${this.data.cartList.length})`,
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '当前购物车为空',
        icon: 'none',
        duration: 1000
      })
    }
    
  }
})