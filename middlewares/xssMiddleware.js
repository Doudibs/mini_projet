const xss = require('xss')


function cleanObject(obj){
    for (let key in obj) {
       if (typeof obj[key] === 'string') {
        obj[key] = xss(obj[key])
       }
       else if (typeof obj[key] === 'object' && obj[key] !== null){
        cleanObject(obj[key]);
       }
    }
    return obj
}

const xssMiddleware = (req, res, next) => {
    if (req.body) {
        cleanObject(req.body)
    }
    if (req.params) {
        cleanObject(req.params)
    }
    next();
}

module.exports = xssMiddleware