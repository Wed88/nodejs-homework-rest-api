const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { createError } = require('../helpers/errors');
const { User } = require('../models/user');
const { SECRET_KEY } = require('../helpers/env');

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
    const user = await User.findOne({ email });

    if (user && !user.verify) {
        throw createError(401, "Please confirm your email")
    }

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

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findByIdAndUpdate(user._id, { token, email, user })
    return { token, email, user }
};

const logoutUser = async (_id) => {
    await User.findByIdAndUpdate(_id, { token: null });
 };

const authenticateUser = async (token) => {
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        const { id } = payload;
        return await User.findById(id);
    } catch (error) {
        return null
    }
    
};

const updateUser = async (id, data) => {
    return User.findByIdAndUpdate(id, data, { new: true })
};

const findUser = async (filters) => { 
    return User.findOne(filters);
};

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    authenticateUser,
    updateUser,
    findUser
}