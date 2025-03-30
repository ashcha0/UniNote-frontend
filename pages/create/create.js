// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 表单提交
   */
  formSubmit: function (e) {
    const { name, description } = e.detail.value
    if (!name || !description) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    const app = getApp();
    app.globalData.request({
      url: '',
      method: 'POST',
      data: {
        name: name,
        description: description
      }
    }).then(() => {
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
      // 返回列表页
      setTimeout(() => {
        wx.navigateBack({
          success: function () {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 1];
            prevPage.loadItems();
          }
        })
      }, 1500);
    }).catch(err => {
      wx.showToast({
        title: '提交失败',
        icon: 'none'
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})