// pages/category/childCpns/y-content/y-content.js
Component({
  properties: {
    subcategories: {
      type: Array,
      value: []
    },
    categoryDetail: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    onBindTap() {
      wx.showToast({
        title: 'empty data',
        icon: "none",
        duration: 1000
      })
    }
  }
})
