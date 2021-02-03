// pages/home/home.js
import {
  POP,
  SELL,
  NEW,
  BACK_TOP_POSITION
} from '../../common/const.js'

import {
  getMultiData,
  getProduct
} from '../../service/home.js'

Page({
  data: {
    banners: [],
    recommends:[],
    titles: ["流行", "新款", "精选"],
    goods: {
      [POP]: { page: 1, list: [] },
      [NEW]: { page: 1, list: [] },
      [SELL]: { page: 1, list: [] }
    },
    currentType: POP,
    topPosition: 0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },
  onLoad: function (options) {
    // 获取轮播图、推荐数据
    this._getMultiData()
    // 获取商品列表数据
    this._getProductData(POP);
    this._getProductData(NEW);
    this._getProductData(SELL);
  },
  onShareAppMessage: function() {},
  /************** 网络请求相关函数 ***************/
  _getMultiData() {
    getMultiData().then(res => {
      // 1.取出轮播和推荐数据
      const banners = res.data.banner.list.map(item => {
        return item.image
      })
      const recommends = res.data.recommend.list

      // 2.设置数据
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getProductData(type) {
    // 1.获取数据对应的页码
    const page = this.data.goods[type].page;

    // 2.请求商品列表数据
    getProduct(type, page).then(res => {
      // 取出数据
      const list = res.data.list;

      // 将数据临时获取
      const goods = this.data.goods;
      goods[type].list.push(...list);
      goods[type].page ++;

      // 设置数据
      this.setData({
        goods
      })
    })
  },
  /************** 事件处理相关函数 ***************/
  loadMore() {
    this._getProductData(this.data.currentType)
  },
  handleTabClick(e) {
    let currentType = ''
    switch(e.detail.index) {
      case 0:
        currentType = POP
        break
      case 1:
        currentType = NEW
        break
      case 2:
        currentType = SELL
        break
    }
    this.setData({
      currentType
    })
    // 使两个tab-control的状态保持一致
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },
  scrollPosition(e) {
    // 获取滚动的顶部
    const position = e.detail.scrollTop;

    // 设置两个标志位,减少setData的次数
    const btFlag = position >= BACK_TOP_POSITION;
    const tcFlag = position >= this.data.tabControlTop;

    // 设置是否显示外部tab-control组件
    if(tcFlag != this.data.showTabControl) {
      this.setData({
        showTabControl: tcFlag
      })
    }
    // 设置是否显示back-top组件
    if(btFlag != this.data.showBackTop) {
      this.setData({
        showBackTop: btFlag
      })
    }
  },
  onImageLoad() {
    // 推荐部分图片加载完毕后tab-control获取到的offsetTop高度才是正确的(onLoad中获取到的太小)
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  onBackTop() {
    this.setData({
      showBackTop: false,
      topPosition: 0
    })
  }
})