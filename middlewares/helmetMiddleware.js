const helmet = require('helmet')

const securityMiddlewares = helmet({
    frameguard: {
        action: 'deny',
    }
})

module.exports = securityMiddlewares