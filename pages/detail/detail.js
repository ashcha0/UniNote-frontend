// 详情页面逻辑
Page({
    data: {
        item: {}
    },
    onLoad: function (options) {
        this.loadItem(options.id);
    },
    loadItem: function (id) {
        const app = getApp();
        app.globalData.request({
            url: `/${id}`,
            method: 'GET'
        }).then(res => {
            this.setData({ item: res });
        }).catch(err => {
            wx.showToast({
                title: '获取详情失败',
                icon: 'none'
            });
        });
    },
    navigateBack: function () {
        wx.navigateBack();
    },
    formSubmit: function (e) {
        const { name, description } = e.detail.value;
        if (!name || !description) {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none'
            });
            return;
        }

        const app = getApp();
        app.globalData.request({
            url: `/${this.data.item.id}`,
            method: 'PUT',
            data: {
                name: name,
                description: description
            }
        }).then(() => {
            wx.showToast({
                title: '修改成功',
                icon: 'success'
            });
            setTimeout(() => {
                wx.navigateBack();
            }, 1500);
        }).catch(err => {
            wx.showToast({
                title: '修改失败',
                icon: 'none'
            });
        });
    }
})