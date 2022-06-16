const userService = require('../services/users.service')

const signupUser = async (reg, res, next) => {
    try {
        const user = await userService.signupUser(reg.body);
        res.json({
            email: user.email,
            subscription: user.subscription,
            id: user._id
        })
    } catch (error) {
        next(error)
    }
    
};

const loginUser = async (reg, res, next) => {
    try {
        const token = await userService.loginUser(reg.body);
        res.json(token)
    } catch (error) {
        next(error)
    }
    
};

const logoutUser = async (reg, res, next) => {
    try {
        await userService.logoutUser(reg.user._id);
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser
}