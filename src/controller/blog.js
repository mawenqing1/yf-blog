const { exec } = require('../db/mysql');

/**
 * get blog list
 * @param {String} author 
 * @param {String} keyword 
 * @returns 
 */
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if(author) {
        sql += `and author='${author}' `
    };
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    };
    sql += `order by createtime desc;`
    return exec(sql)
};

/**
 * get blog detail data
 * @param {Number} id 
 * @returns 
 */
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

/**
 * create new blog
 * @param {Object} blogData 
 * @returns 
 */
const newBlog = (blogData = {}) => {
    const {title, content, author} = blogData;
    const createTime = Date.now();
    const sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${createTime});`
    return exec(sql).then(res => {
        return {
            id: res.insertId
        }
    })
}

/**
 * update blog
 * @param {Number} id 
 * @param {Object} blogData 
 * @returns 
 */
const updateBlog = (id, blogData = {}) => {
    const {title, content} = blogData;
    const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
    return exec(sql).then(res => {
        if(res.affectedRows > 0) {
            return true
        }
        return false
    })
}

/**
 * delete blog
 * @param {Number} id 
 * @param {String} author 
 * @returns 
 */
const deleteBlog = (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(res => {
        if(res.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
};
