//index.js
const app = getApp()
const INVITED_CODE = [
  'test'
]

Page({
  data: {
    openid: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isExisted: false,
    code: 'test'
  },

  onLoad: async function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../error/error',
      })
      return
    }

    if (!this.data.openid) {
      console.log("没有openid")
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log("请求openid成功", res.result.openid)
          app.globalData.openid = res.result.openid
          this.setData({
            openid: res.result.openid
          })
        },
        fail: err => {
           wx.redirectTo({
              url: '../error/error',
            })
        }
      })
    }
  },

  async bindGetUserInfo (e) {

    console.log(e)
    wx.cloud.callFunction({
      name: 'storeVisitRecord',
      data: {
        ...e.detail.userInfo,
        date: new Date()
      },
      success: res => {
        console.log('[云函数] [storeVisitRecord] 调用成功: ', res)
      },
      fail: err => {
        console.log('[云函数] [storeVisitRecord] 调用失败: ', err)
      }
    })

    if(!this.data.code) {
      wx.showToast({
        title: '请填写邀请码',
        icon: 'error',
        duration: 1000
      }) 
      return;     
    }

    if(INVITED_CODE.indexOf(this.data.code) < 0) {
      wx.showToast({
        title: '邀请码不存在',
        icon: 'error',
        duration: 1000
      }) 
      return;     
    }

    if(!app.globalData.isAuth) {
      wx.getUserProfile({
        desc: '用于完善您的信息', // 声明获取用户个人信息后的用途
        success: (res) => {
          console.log("用户授权之后的信息", res);
          app.globalData.userInfo = res.userInfo;
          app.globalData.isAuth = true;
          wx.navigateTo({
            url: '../fin/home/home',
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '../fin/home/home',
      })
    }
  },

  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  async doGetUserInfo(openid) {
    try {
     const res = await this.doCallCloudFunction('userInfo', { type: 'getUserInfo', query: { openid } });
     this.setData({
       isExisted: !!res.result.data
     })
    } catch (error) {
      console.log(`[doGetUserInfo] 调用失败: `, err)
    }
  },

  async doCallCloudFunction(name, data) {
    try {
      const res = await wx.cloud.callFunction({
        name: name,
        data: data
      })
      console.log(`[云函数] [${name}] 调用成功: `, res)
      return res;
    } catch (error) {
      console.log(`[云函数] [${name}] 调用失败: `, err)
      throw Error(error);
    }
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
