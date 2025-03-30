// 小程序入口文件
App({
    onLaunch: function () {
        // 小程序初始化
    },
    globalData: {
        baseUrl: 'http://localhost:8080/api/items', // 本地后端API基础URL
        request: function (options) {
            return new Promise((resolve, reject) => {
                wx.request({
                    url: this.baseUrl + (options.url || ''),
                    method: options.method || 'GET',
                    data: options.data || {},
                    success: (res) => {
                        if (res.statusCode >= 200 && res.statusCode < 300) {
                            resolve(res.data);
                        } else {
                            reject(res.data);
                        }
                    },
                    fail: (err) => {
                        reject(err);
                    }
                });
            });
        }
    }
})