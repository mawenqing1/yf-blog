const querystring = require("querystring");
const { access } = require('./src/utils/log')
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

//session data
const SESSION_DATA = {};

//get cookie expires time
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    return d.toGMTString()
}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({});
            return;
        }
        if (req.headers["content-type"] !== "application/json") {
            resolve({});
            return;
        }
        let postData = "";
        req.on("data", (chunk) => {
            postData += chunk.toString();
        });
        req.on("end", () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        });
    });
    return promise;
};

const serverHandle = (req, res) => {
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    res.setHeader("content-type", "application/json");

    const url = req.url;
    req.path = url.split("?")[0];
    //get query
    req.query = querystring.parse(url.split("?")[1]);
    req.cookie = {};
    //get cookie
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(el => {
        if(!el) return;
        let arr = el.split('=');
        let key = arr[0].trim();
        let val = arr[1].trim();
        req.cookie[key] = val;
    });
    //get session
    let needSetCookie = false;
    let userId = req.cookie.userId;
    if(userId) {
        if(!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    getPostData(req).then((postData) => {
        req.body = postData;

        //handle blog router
        const blogRes = handleBlogRouter(req, res);
        if(blogRes) {
            blogRes.then(blogData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData));
            })
            return
        }

        //handle user router
        const userRes = handleUserRouter(req, res);
        if (userRes) {
            userRes.then(userData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData));
            })
            return;
        }

        //not found router  return 404
        res.writeHead(404, "content-type", "text/plain");
        res.write("404 Not Found");
        res.end();
    });
};

module.exports = serverHandle;

// process.env.NODE_ENV
