var express = require("express");
var router = express.Router();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require('../model/resModel');

/* GET users listing. */
router.post("/login", function (req, res, next) {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then((data) => {
        if (data.username) {
            //set session
            req.session.username = data.username;
            req.session.realname = data.realname; 
            res.json(new SuccessModel());
            return
        }
        res.json(new ErrorModel("登陆失败"));
    });
});

router.get("/login-test", (req, res, next) => {
  if(req.session.username) {
    res.json({
      code: 1,
      msg: '成功'
    })
    return
  }
  res.json({
    code: -1,
    msg: '失败'
  })
});

// router.get("/session-test", (req, res, next) => {
//     const session = req.session;
//     if (session.viewNum == null) {
//         session.viewNum = 0;
//     }
//     session.viewNum++;
//     res.json({
//         viewNum: session.viewNum,
//     });
// });

module.exports = router;
