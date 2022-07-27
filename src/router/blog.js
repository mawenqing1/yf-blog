const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;
    
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);

        return new SuccessModel(listData)
    };

    if(method === 'GET' && req.path === '/api/blog/detail') {
        const detailData = getDetail(id);
        return new SuccessModel(detailData)
    };

    if(method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body);
        return new SuccessModel(data)
    };

    if(method === 'POST' && req.path === '/api/blog/update') {
        const res = updateBlog(id, req.body);
        if(res) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新失败 ')
        }
    };

    if(method === 'POST' && req.path === '/api/blog/delete') {
        const res = deleteBlog(id);
        if(res) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除失败 ')
        }
    };
}

module.exports = handleBlogRouter