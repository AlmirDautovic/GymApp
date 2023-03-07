const express = require("express");
const router = express.Router();
const users = require('../controllers/users');
const gymItem = require('../controllers/gymEquipment');
const blogs = require('../controllers/blogs');
const User = require('../models/user')


router.get('/', users.renderHomePage);

router.get('/users', paginatedResults(User), users.displayAllUsers);

router.get('/users/change', users.getSelectedUsers);

router.get('/users/new', users.renderNewForm);

router.get('/users/search', users.searchUsers);

router.post('/users/index', users.createNewUser);

router.get('/users/json', users.ajaxUsers);

router.get('/users/:id', users.getSelectedUser);

router.get('/users/:id/edit', users.renderEditForm);

router.put('/users/:id', users.editUser);

router.delete('/users/delete', users.deleteUserAjax);

router.delete('/users/:id', users.deleteUser);

router.get('/contact', users.renderContactForm);

router.get('/gymequipment', gymItem.renderGymItemPage);

router.post('/gymequipment', gymItem.createItem);

router.get('/gymitem', gymItem.displayItem);

router.get('/blogs', blogs.renderBlogPage);

router.get('/blogs/new', blogs.renderBlogForm);

router.post('/blogs', blogs.createNewBlogPost);

router.get('/test', paginatedResults(User), users.test)
function paginatedResults(model) {
    return async (req, res, next) => {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        // const page = parseInt(req.query.page)
        const limit = 5;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
            results.currentPage = page
        };
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
            results.currentPage = page
        }
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec();
            results.pageNumber = Math.ceil(await model.countDocuments().exec() / limit)
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

module.exports = router;