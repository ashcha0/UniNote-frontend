// 详情页面逻辑
Page({
    data: {
        item: {},
        loading: true,
        submitting: false
    },
    onLoad: function (options) {
        this.loadItem(options.id);
    },
    loadItem: function (id) {
        const app = getApp();
        this.setData({ loading: true });
        app.globalData.request({
            url: `/${id}`,
            method: 'GET'
        }).then(res => {
            this.setData({
                item: res,
                loading: false
            });
        }).catch(err => {
            this.setData({ loading: false });
            wx.showModal({
                title: '提示',
                content: '获取详情失败，是否重试？',
                success: (res) => {
                    if (res.confirm) {
                        this.loadItem(id);
                    }
                }
            });
        });
    },
    navigateBack: function () {
        wx.navigateBack();
    },
    formSubmit: function (e) {
        if (this.data.submitting) return;

        const { name, description } = e.detail.value;
        if (!name || !description) {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none'
            });
            return;
        }

        this.setData({ submitting: true });

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
        }).finally(() => {
            this.setData({ submitting: false });
        });
    }
})