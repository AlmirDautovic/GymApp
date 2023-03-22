const express = require("express");
const router = express.Router();
const users = require('../controllers/users');
const gymItem = require('../controllers/gymEquipment');
const blogs = require('../controllers/blogs');
const paginatedResults = require('../utils/pagination')
const isLogedIn = require('../utils/requireLogin');
const User = require('../models/user')


router.get('/', users.renderHomePage);

router.get('/login', users.renderLoginForm);

router.post('/login', users.userLogin);

router.post('/logout', users.logout)

router.get('/logout', users.logout)

router.get('/users', isLogedIn, paginatedResults(User), users.displayAllUsers);

router.get('/users/change', paginatedResults(User), users.getSelectedUsers);

router.get('/users/new', users.renderNewForm);

router.get('/users/search', users.searchUsers);

router.post('/users/index', users.createNewUser);

router.get('/users/json', users.ajaxUsers);

router.get('/users/:id', paginatedResults(User), users.getSelectedUser);

router.get('/users/:id/edit', users.renderEditForm);

router.put('/users/:id', users.editUser);

router.delete('/users/delete', paginatedResults(User), users.deleteUserAjax);

router.delete('/users/:id', users.deleteUser);

router.get('/contact', users.renderContactForm);

router.get('/gymequipment', gymItem.renderGymItemPage);

router.post('/gymequipment', gymItem.createItem);

router.get('/gymitem', gymItem.displayItem);

router.get('/blogs', blogs.renderBlogPage);

router.get('/blogs/new', isLogedIn, blogs.renderBlogForm);

router.post('/blogs', isLogedIn, blogs.createNewBlogPost);

router.get('/test', paginatedResults(User), users.test)


module.exports = router;