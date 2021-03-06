const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method;
 
    if(method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const res = login(username, password)

        if(res) {
            return new SuccessModel();
        } else {
            return new ErrorModel('登陆失败');
        }
    }
}

module.exports = handleUserRouter