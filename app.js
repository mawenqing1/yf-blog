const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req,res) => {
    res.setHeader('Content-type', 'application/json');

    const url = req.url;
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1])

    //handle blog router
    const blogData = handleBlogRouter(req, res);
    if(blogData) {
        res.end(JSON.stringify(blogData))
        return
    }

    //handle user router
    const userData = handleUserRouter(req, res);
    if(userData) {
        res.end(JSON.stringify(userData))
        return
    }

    //not found router  return 404
    res.writeHead(404, 'Content-type', 'text/plain');
    res.write('404 Not Found');
    res.end();
}

module.exports = serverHandle

// process.env.NODE_ENV