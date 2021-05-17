// miniprogram/pages/fin/main/main.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    overviewData: [
      {
        name: '近一周',
        amount: 2490,
        key: 'week'
      },
      {
        name: '近一个月',
        amount: 24970,
        key: 'month'
      },
      {
        name: '近一年',
        amount: 12432,
        key: 'year'
      },
    ],
    transactionData: [
      {
        id: 1,
        type: 1001,
        amount: 45.00,
        time: '2021-01-02 21:00:00'
      },
      {
        id: 2,
        type: 1002,
        amount: 65.00,
        time: '2021-01-03 21:00:00'
      },
      {
        id: 3,
        type: 1002,
        amount: 69.00,
        time: '2021-01-03 21:00:00'
      },
      {
        id: 4,
        type: 1002,
        amount: 69.00,
        time: '2021-01-03 21:00:00'
      },
    ],
    activeKey: 'week',
    mode: 0,
    avatarUrl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleOverviewClick: function(e) {
    this.setData({
      activeKey: e.mark.key
    })
  },

  toggleMode: function() {
    if (this.data.mode) {
      this.setData({
        mode: 0
      })
    } else {
      this.setData({
        mode: 1
      })
    }
  }
})