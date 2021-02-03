// pages/home/childCpns/y-recommend/y-recommend.js
Component({
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },
  data: {
    count: 1
  },
  methods: {
    onImageLoad() {
      this.data.count ++
      if(this.data.count === this.properties.recommends.length) {
        this.triggerEvent('imageLoad', {}, {})
        // console.log(this.data.count)
      }
    }
  }
})