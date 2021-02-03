// pages/detail/detail.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo,
} from '../../service/detail.js'

import {
  BACK_TOP_POSITION
} from '../../common/const.js'

const app = getApp()

Page({
  data: {
    iid: '', 
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {},
    showBackTop: false,
    scrollyTo: 0
  },
  onLoad: function(options) {
    // 1.获取传入的iid
    this.setData({
      iid: options.iid
    })
    // 2.请求商品详情数据
    this._getDetailData()
    // 3.请求推荐的数据
    this._getRecommends()
  },
  /************** 网络请求相关函数 ***************/
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      const data = res.result;
      // 1.取出顶部的图片
      const topImages = data.itemInfo.topImages;
      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);
      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;
      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }
      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      this.setData({
        recommends: res.data.list
      })
    })
  },
  /************** 事件处理相关函数 ***************/
  scrollPosition(e) {
    // 获取滚动的顶部
    const position = e.detail.scrollTop;
    // 设置标志位,减少setData的次数
    const btFlag = position >= BACK_TOP_POSITION;
    // 设置是否显示back-top组件
    if(btFlag != this.data.showBackTop) {
      this.setData({
        showBackTop: btFlag
      })
    }
  },
  onBackTop() {
    this.setData({
      showBackTop: false,
      scrollyTo: 0
    })
  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 2.加入到购物车列表,getApp()获取到小程序全局唯一的App实例
    app.addToCart(obj)
  }
})