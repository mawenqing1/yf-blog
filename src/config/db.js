const env = process.env.NODE_ENV;

let MYSQL_CONFIG

if(env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'mwq',
        port: '3306',
        database: 'myblog'
    }
};

if(env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'mwq',
        port: '3306',
        database: 'myblog'
    }
};

module.exports = {
    MYSQL_CONFIG
}