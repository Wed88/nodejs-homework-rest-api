const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { createError } = require('../helpers/errors');
const { User } = require('../models/user');
const { SECRET_KEY } = require('../helpers/env')

const signupUser = async (userData) => {
    const result = await User.findOne({ email: userData.email });
    if (result) {
        throw createError(409, 'Email in use')
    }

    const password = userData.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ ...userData, password: hashedPassword });

    return user;

};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email});

    if (!user) {
        throw createError(401, "Email or password is wrong")
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
        throw createError(401, "Email or password is wrong")
    }

    const payload = {
        id: user._id,
        subscription: user.subscription,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
    return { token };
}

module.exports = {
    signupUser,
    loginUser
}