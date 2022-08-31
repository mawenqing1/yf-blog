const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require("../db/redis");

const handleUserRouter = (req, res) => {
    const method = req.method;
 
    if(method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const res = login(username, password)
        return res.then(data => {
            if(data.username) {
                //set session
                req.session.username = data.username;
                req.session.realname = data.realname;
                set(req.sessionId, req.session)
                return new SuccessModel();
            }
            return new ErrorModel('登陆失败');
        })
    }
}

module.exports = handleUserRouter