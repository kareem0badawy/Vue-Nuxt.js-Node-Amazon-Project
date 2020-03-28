const jwt = require('jsonwebtoken');

module.exports = function(request, response,next) {
    let token = request.headers['x-access-token'] || request.headers['authorization'];
    let checkBearer = "Bearer ";

    if(token){
        if(token.startsWith(checkBearer)){
            token = token.slice(checkBearer.length, token.length);
        }
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                response.json({
                    success: false,
                    message: "Failed to authenticate"
                });
            }else{
                request.decoded = decoded;
                next();
            }
        })
    }else{
        response.json({
            success: false,
            message: "No Token provided"
        });
    }
}