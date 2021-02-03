import {
 baseURL,
 timeout
} from './config.js'

function request(options) {
  wx.showLoading({
    title: '数据加载中...',
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      timeout: timeout,
      data: options.data,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}

export default request