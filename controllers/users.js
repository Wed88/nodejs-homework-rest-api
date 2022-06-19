const userService = require('../services/users.service')

const signupUser = async (reg, res, next) => {
    try {
        const user = await userService.signupUser(reg.body);
        res.status(201).json({
            status: "created",
            code: 201,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
    } catch (error) {
        next(error)
    }
    
};

const loginUser = async (reg, res, next) => {
    try { 
        const { user } = await userService.loginUser(reg.body);
        const token = await userService.loginUser(reg.body);
        res.status(200).json({
            status: "success",
            code: 200,
            token: token.token,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
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
    
};

const currentUser = async (req, res, next) => {
  try {
    const { user } = req;
    res.json({
      status: "success",
      code: 200,
      data: {
          email: user.email,
          subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    currentUser
}