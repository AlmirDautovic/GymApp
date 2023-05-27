const requireAdmin = (req, res, next) => {
    if (!req.session.role) {
        return res.redirect('/login');
    }
    next();
}

module.exports = requireAdmin;