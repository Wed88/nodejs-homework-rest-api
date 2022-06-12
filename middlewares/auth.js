const { createError } = require("../helpers/errors");
const {authenticateUser} = require('../services/auth.service')

const auth = async (reg, res, next) => {
    const { authorization = "" } = reg.headers;
    const [bearer, token] = authorization.split(' ');
    console.log('bearer',bearer)
    console.log('token',token)

    if (bearer !== 'Bearer' || !token) {
        next(createError(401,'Not authorized'))
    }

    const user = await authenticateUser(token);
    if (!user || !user.token) {
        next(createError(401,'Not authorized'));
    }

    next();
}

module.exports = {
    auth
}