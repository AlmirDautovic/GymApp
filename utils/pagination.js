paginatedResults = function (model) {
    return async (req, res, next) => {
        // const page = req.query.page ? parseInt(req.query.page) : 1;
        const page = parseInt(req.query.page);
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
            results.totalPageNumber = Math.ceil(await model.countDocuments().exec() / limit)
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

module.exports = paginatedResults