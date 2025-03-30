// API接口文档
const API_DOCS = {
    // 数据管理接口
    item: {
        // 1. 分页查询
        getList: {
            method: 'GET',
            url: '/api/items',
            params: {
                page: '页码(默认0)',
                size: '每页数量(默认10)'
            },
            response: '分页后的Item列表'
        },

        // 2. 创建条目
        create: {
            method: 'POST',
            url: '/api/items',
            body: 'Item对象',
            response: '创建成功的Item对象'
        },

        // 3. 获取条目详情
        getDetail: {
            method: 'GET',
            url: '/api/items/{id}',
            params: {
                id: '条目ID'
            },
            response: '对应的Item对象'
        }
    },

    // 错误码定义
    errorCodes: {
        400: '请求参数错误',
        401: '未授权',
        404: '资源不存在',
        500: '服务器内部错误'
    }
}

export default API_DOCS