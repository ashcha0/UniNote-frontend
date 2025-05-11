// 列表页面逻辑
Page({
    data: {
        items: [],
        page: 0,
        size: 10
    },
    onLoad: function () {
        this.loadItems();
    },
    onShow: function () {
        this.loadItems();
    },
    loadItems: function () {
        const app = getApp();
        app.globalData.request({
            url: '',  // baseUrl已经包含完整路径，所以这里保持空字符串
            method: 'GET',
            data: {
                page: this.data.page,
                size: this.data.size
            }
        }).then(res => {
            // 格式化每个项目的创建时间
            const formattedItems = res.content.map(item => {
                if (item.createTime) {
                    // 将ISO格式的日期字符串转换为Date对象
                    const date = new Date(item.createTime);
                    item.createTime = this.formatDate(date);
                }
                return item;
            });
            this.setData({ items: formattedItems });
        }).catch(err => {
            wx.showToast({
                title: '加载失败',
                icon: 'none'
            });
        });
    },
    navigateToDetail: function (e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/detail/detail?id=${id}`
        });
    },
    navigateToCreate: function () {
        wx.navigateTo({
            url: '/pages/create/create'
        });
    },

    // 格式化日期
    formatDate: function (date) {
        const now = new Date();
        const diff = now - date; // 时间差（毫秒）

        // 如果是今天
        if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `今天 ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        }

        // 如果是昨天
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()) {
            return '昨天';
        }

        // 其他日期
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    },
    deleteItem: function (e) {
        const id = e.currentTarget.dataset.id;
        const app = getApp();
        app.globalData.request({
            url: `/${id}`,  // 确保URL格式与后端API匹配
            method: 'DELETE'
        }).then(() => {
            wx.showToast({
                title: '删除成功',
                icon: 'success'
            });
            this.loadItems();
        }).catch(err => {
            wx.showToast({
                title: '删除失败',
                icon: 'none'
            });
        });
    }
})