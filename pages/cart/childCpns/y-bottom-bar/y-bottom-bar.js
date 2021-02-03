// pages/cart/childCpns/y-bottom-bar/y-bottom-bar.js
Component({
  properties: {
    selected: {
      type: Boolean,
      value: false
    },
    price: {
      type: Number,
      value: 0
    },
    counter: {
      type: Number,
      value: 0
    }
  },
  data: {

  },
  methods: {
    checkAll() {
      this.triggerEvent("checkall", {}, {})
    },
    clearAll() {
      this.triggerEvent("clearall", {}, {})
    }
  }
})
