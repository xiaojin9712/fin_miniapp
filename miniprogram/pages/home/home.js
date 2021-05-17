// miniprogram/pages/home/home.js

const app = getApp();

const INVITED_CODE = [
  'LOVE'
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuthorize: false,
    avatarUrl: '',
    userInfo: {
      nickName: '',
      gender: 0
    },
    code: 'LOVE'
  },



  bindFinClick() {
    console.log("用户信息", app.globalData.userInfo)
    wx.cloud.callFunction({
      name: 'userInfo',
      data: {
        type: 'getUserList'
      },
      success: res => {
        console.log('[云函数] [userInfo] 调用成功: ', res.result.data)
      },
      fail: err => {
        console.log('[云函数] [userInfo] 调用失败: ', err)
      }
    })
    // 获取用户信息
    wx.getUserProfile({
      desc: '用于完善您的信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        console.log("用户授权之后的信息", res)


      }
    })
    wx.navigateTo({
      url: '../fin/home/home',
    })
  },

  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  // cloudFunction: function(name, data)

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("启动")
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
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

  }
})