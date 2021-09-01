const User = require('../models/User');
const HttpError = require('../models/HttpError');

const getUsers = async (req, res, next) => {
    let usersList;
    try {
        usersList = await User.find({});
    } catch (err) {
        return next(new HttpError('Error Made'))
    }

    res.json(usersList);
};

const getUser = async (req, res, next) => {
    const { userId } = req.params;
    // validations TODO
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return next(new HttpError('Error Made.', 500));
    }

    res.json(user);
};

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const updateParams = req.body;

    // validation need to be added here for updateParams -> TODO

    let updatedUser;
    try{
        updatedUser = await User.findOneAndUpdate({_id: userId}, {...updateParams}, {new: true});
        console.log(updatedUser);
    }catch(err){
        return next(new HttpError('Error Made', 500));
    }
    res.json(updatedUser);
};

const createNewUser = async (req, res, next) => {
    const { firstName, lastName } = req.body;

    // validations TODO

    let createdUser;
    try {
        createdUser = await User.create({ firstName, lastName });
    } catch (err) {
        return next(new HttpError('Error Made.', 500));
    }

    res.json(createdUser);
};

module.exports = {
    getUsers,
    getUser,
    updateUser,
    createNewUser
};