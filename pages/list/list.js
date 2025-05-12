// 列表页面逻辑
Page({
    data: {
        items: [],
        page: 0,
        size: 10,
        filterType: 'all', // 默认筛选类型：全部
        sortType: 'newest' // 默认排序方式：最新
    },
    onLoad: function () {
        this.loadItems();
    },
    onShow: function () {
        this.loadItems();
    },
    // 设置筛选类型
    setFilter: function (e) {
        const type = e.currentTarget.dataset.type;
        this.setData({ filterType: type });

        // TODO: 后端未实现筛选功能，这里仅更新UI状态
        // 实际项目中，应该根据筛选类型重新请求数据或过滤现有数据
        wx.showToast({
            title: '筛选功能开发中',
            icon: 'none'
        });
    },
    // 设置排序方式
    setSort: function (e) {
        const type = e.currentTarget.dataset.type;
        this.setData({ sortType: type });

        // 根据排序类型对数据进行排序
        const items = [...this.data.items];
        if (type === 'newest') {
            // 最新排序（ID降序）
            items.sort((a, b) => b.id - a.id);
        } else if (type === 'oldest') {
            // 最早排序（ID升序）
            items.sort((a, b) => a.id - b.id);
        }

        this.setData({ items: items });
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

            // 对笔记进行排序，确保新创建的笔记显示在最上方
            // 这里假设每个笔记项目有一个id字段，id越大表示越新创建的笔记
            if (this.data.sortType === 'newest') {
                formattedItems.sort((a, b) => b.id - a.id);
            } else {
                formattedItems.sort((a, b) => a.id - b.id);
            }

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