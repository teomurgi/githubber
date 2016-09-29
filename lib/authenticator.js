'use strict';
const fs = require('fs');

const authenticate = function(keys) {
        return function(req, res, next){
            if(keys.indexOf(req.headers.apikey)!==-1) return next();
            res.statusCode = 401;
            res.end('Unauthorized');
        }
};

module.exports = authenticate;