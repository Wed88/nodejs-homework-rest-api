const authService = require('../services/auth.service')

const signupUser = async (reg, res, next) => {
    try {
        const user = await authService.signupUser(reg.body);
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
        const token = await authService.loginUser(reg.body);
        res.json(token)
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    signupUser,
    loginUser
}