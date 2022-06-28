const userService = require('../services/users.service');
const emailService  = require('../services/email.service');
const { uploadImage } = require('../services/image.service');
const { updateUser } = require('../services/users.service');
const { createError } = require('../helpers/errors');

const signupUser = async (reg, res, next) => {
    try {
        const user = await userService.signupUser(reg.body);
        await emailService.sendEmail(user.email, user.verificationToken);
        res.status(201).json({
            status: "created",
            code: 201,
            user: {
                email: user.email,
                subscription: user.subscription,
                avatarURL: user.avatarURL,
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

const updateAvatar = async (req, res, next) => {
    try {

        const { _id: id } = req.user;
        const avatarURL = await uploadImage(id, req.file);
        const user = await updateUser(id, { avatarURL });

        res.status(200).json({
            data: {
                avatarURL: user.avatarURL,
            },
        });
        
    } catch (error) {
        next(error);
    }
  
};

const confirm = async (reg, res, next) => {
    try {
        // const user = await userService.signupUser(reg.body);
        const { verificationToken } = reg.params;
        const user = userService.findUser({ verificationToken });
        
        if (!user) {
            throw createError(404,"User not found");
        }

        await userService.updateUser(user._id, { verify: true, verificationToken: null });

        res.status(200).json({
            status: "success",
            code: 200,
            message: "Verification successful",
        })
    } catch (error) {
        next(error)
    }
    
};

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    currentUser,
    updateAvatar,
    confirm
}