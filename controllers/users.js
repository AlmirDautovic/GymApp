const User = require('../models/user');

module.exports.renderHomePage = (req, res) => {
    res.render('home');
};

module.exports.renderContactForm = (req, res) => {
    res.render('contact');
};


module.exports.test = async (req, res) => {
    const { status } = req.query;
    var users;
    if (status == 'true') {
        users = await User.find({ status });
    } else if (status == "false") {
        users = await User.find({ status: { $ne: true } });
    }
    else {
        users = await User.find({});
    }
    // users = users.slice(startIndex, endIndex)
    users = res.paginatedResults

    var myIndex = users.pageNumber;

    console.log(users)
    res.json(users)
};

module.exports.displayAllUsers = async (req, res) => {
    const { status } = req.query;
    var users;
    if (status == 'true') {
        users = await User.find({ status });
    } else if (status == "false") {
        users = await User.find({ status: { $ne: true } });
    }
    else {
        users = await User.find({});
    }
    users = res.paginatedResults

    var myIndex = users.pageNumber;
    res.render('users/index', { users, myIndex });
};

module.exports.getSelectedUsers = async (req, res) => {
    const { status } = req.query;
    var users;
    if (status == 'true') {
        users = await User.find({ status });
    } else if (status == "false") {
        users = await User.find({ status: { $ne: true } });
    }
    else {
        users = await User.find({});
    }
    res.json(users)
};

module.exports.searchUsers = async (req, res) => {
    const { username } = req.query;
    const users = await User.find({ username: { '$regex': username, '$options': 'i' } });
    res.json(users);
}

module.exports.renderNewForm = (req, res) => {
    res.render('users/new');
};

module.exports.createNewUser = async (req, res) => {
    var newUser;
    if (req.files == null) {
        newUser = new User({
            "username": req.body.username, "password": req.body.password,
            "status": req.body.status, "profile_image": "np_profile_img.jpg"
        });
    } else {
        const { profile_image } = req.files;
        profile_image.mv("public" + "/" + "images" + "/" + "profile" + "/" + profile_image.name);
        newUser = new User(req.body);
        newUser.profile_image = profile_image.name
    }
    await newUser.save();
    res.redirect(`/users/${newUser._id}`);
};

module.exports.ajaxUsers = async (req, res) => {
    const { id } = req.query;
    const users = await User.find({ _id: { $ne: id } }, { username: 1, status: 1, profile_image: 1 });
    res.json(users);
};

module.exports.getSelectedUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('users/show', { user });
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

module.exports.deleteUserAjax = async (req, res) => {
    const { id } = req.query;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({});
};

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.redirect('/users');
};

