const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
    const method = req.method;
    
    const id = req.query.id;

    if (method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author || "";
        const keyword = req.query.keyword || "";
        const result = getList(author, keyword);
        return result.then((listData) => {
            return new SuccessModel(listData);
        });
    }

    if (method === "GET" && req.path === "/api/blog/detail") {
        const res = getDetail(id);
        return res.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method === "POST" && req.path === "/api/blog/new") {
        const author = 'zs';
        req.body.author = author;
        const res = newBlog(req.body);
        return res.then(data => {
            return new SuccessModel(data);
        })
    }

    if (method === "POST" && req.path === "/api/blog/update") {
        const res = updateBlog(id, req.body);
        return res.then(res => {
            if (res) {
                return new SuccessModel();
            } else {
                return new ErrorModel("更新失败 ");
            }
        })
    }

    if (method === "POST" && req.path === "/api/blog/delete") {
        const author = 'zs';
        const res = deleteBlog(id, author);
        return res.then(res => {
            if (res) {
                return new SuccessModel();
            } else {
                return new ErrorModel("删除失败 ");
            }
        })
    }
};

module.exports = handleBlogRouter;
