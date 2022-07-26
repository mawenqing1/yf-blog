const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: "标题A",
            content: "内容A",
            createTime: 1658755417806,
            author: "张三",
        },
        {
            id: 2,
            title: "标题B",
            content: "内容B",
            createTime: 1658755439884,
            author: "里斯",
        },
    ];
};

const getDetail = (id) => {
    return {
        id: 1,
        title: "标题A",
        content: "内容A",
        createTime: 1658755417806,
        author: "张三",
    };
};

const newBlog = (blogData = {}) => {
    console.log('new blog', blogData);
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    console.log('update blog', id, blogData);
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog
};
