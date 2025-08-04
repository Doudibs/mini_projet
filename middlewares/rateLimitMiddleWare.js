const rateLimit = require('express-rate-limit')


const apiLimiter = rateLimit({
    windowMs: 10 * 1000, //10 secodes 1000 ms * 10
    max: 1000, 
    message: {
        status : 429,
        error: 'Trop de requetes Réessayez dans 10 secondes'
    }

})

module.exports = apiLimiter;