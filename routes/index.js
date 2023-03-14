const express = require("express");
const router = express.Router();
const users = require('../controllers/users');
const gymItem = require('../controllers/gymEquipment');
const blogs = require('../controllers/blogs');
const paginatedResults = require('../utils/pagination')
const User = require('../models/user')


router.get('/', users.renderHomePage);

router.get('/login', users.renderLoginForm);

router.post('/login', users.userLogin);

router.get('/secret', users.secretTest);

router.post('/logout', users.logout)

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


module.exports = router;