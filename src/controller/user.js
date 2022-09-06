const { exec, escape } = require('../db/mysql');

/**
 * user login
 * @param {String} username 
 * @param {String} password 
 * @returns 
 */
const login = (username, password) => {
    username = escape(username)
    password = escape(password)
    const sql = `select username, realname from users where username=${username} and password=${password}`
    return exec(sql).then(res => {
        return res[0] || {};
    })
}

module.exports = {
    login
}