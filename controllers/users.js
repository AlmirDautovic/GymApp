const User = require('../models/user');
const Consultation = require('../models/consultation');
const bcrypt = require('bcrypt');

module.exports.renderHomePage = (req, res) => {
    res.render('home');
};

module.exports.displayPaginationForUsers = async (req, res) => {
    const id = req.session.user_id
    const loggedUser = await User.findById(id);
    let role = loggedUser.role;
    let users = res.paginatedResults;
    res.status(200).json({ users, role })
};

module.exports.displayAllUsers = async (req, res) => {
    let users = res.paginatedResults;
    const id = req.session.user_id;
    const loggedUser = await User.findById(id);
    let role = loggedUser.role;
    var myIndex = users.totalPageNumber;
    res.render('users/index', { users, myIndex, role });
};

module.exports.getSelectedUsers = async (req, res) => {
    let users = res.paginatedResults
    res.json(users)
};

module.exports.searchUsers = async (req, res) => {
    const { username } = req.query;
    const users = await User.find({ username: { '$regex': username, '$options': 'i' } });
    res.json(users);
}

module.exports.createNewUser = async (req, res) => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12)
    var newUser = new User(req.body);
    newUser.password = hash;
    if (req.files !== null) {
        const { profile_image } = req.files;
        profile_image.mv("public" + "/" + "images" + "/" + "profile" + "/" + profile_image.name);
        newUser.profile_image = profile_image.name
    }
    req.session.loggedin = true
    req.session.user_id = newUser._id;
    req.session.role = newUser.role;

    await newUser.save();
    res.redirect(`/users/${newUser._id}`);
};

module.exports.createUserFromConsultation = async (req, res) => {
    const { username, email } = req.body;
    let newUser = new User(req.body);
    let password = Math.random().toString(36).substring(2, 7);
    const hash = await bcrypt.hash(password, 12);
    newUser.password = hash;

    let consultation = await Consultation.findOne({ $and: [{ name: { $eq: username } }, { email: { $eq: email } }] });
    consultation.userId = newUser._id.valueOf();

    await consultation.save();
    await newUser.save();
    res.redirect(`/consultation`);
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.userLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && password != null) {
        const validatedPassword = await bcrypt.compare(password, user.password);
        const redirectUrl = req.session.returnTo || '/';
        if (validatedPassword) {
            req.session.loggedin = true;
            req.session.user_id = user._id;
            if (user.role === 'admin') {
                req.session.role = true;
            } else {
                req.session.role = false;
            }
            res.redirect(redirectUrl);
        } else {
            res.redirect('/login');
        }
    }
}

module.exports.logout = (req, res) => {
    req.session.user_id = null;
    req.session.loggedin = false;
    req.session.role = false;
    res.redirect('/');
}

module.exports.ajaxUsers = async (req, res) => {
    const { id } = req.query;
    const users = await User.find({ _id: { $ne: id } }, { username: 1, status: 1, profile_image: 1 });
    res.json(users);
};

module.exports.getSelectedUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const loggedUserId = req.session.user_id
    const loggedUser = await User.findById(loggedUserId);
    let role = loggedUser.role;
    res.render('users/show', { user, role });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('users/edit', { user })
};

module.exports.editUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/users/${user._id}`);
};

module.exports.deleteUserFromAllUserPage = async (req, res) => {
    const { id } = req.params;
    const loggedUser = await User.findById(req.session.user_id);
    let role = loggedUser.role;
    if (role === 'admin') {
        await User.findByIdAndDelete(id);
    }
    res.json({ role });
};


