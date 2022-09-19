const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/crpy')

/**
 * user login
 * @param {String} username 
 * @param {String} password 
 * @returns 
 */
const login = (username, password) => {
    username = escape(username)
    password = genPassword(password)
    password = escape(password)
    const sql = `select username, realname from users where username=${username} and password=${password}`
    return exec(sql).then(res => {
        return res[0] || {};
    })
}

module.exports = {
    login
}