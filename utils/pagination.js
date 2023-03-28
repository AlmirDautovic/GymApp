paginatedResults = function (model) {
    return async (req, res, next) => {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        // const page = parseInt(req.query.page);
        const limit = 5;
        const status = req.query.status;
        // console.log(status)
        const startIndex = (page - 1) * limit;
        const username = req.query.username;
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
            if (status == 'true') {
                results.results = await model.find({ status }).limit(limit).skip(startIndex).exec();
                results.totalPageNumber = (Math.ceil(await model.find({ status }).count() / limit));
            } else if (status == 'false') {
                results.results = await model.find({ status: { $ne: true } }).limit(limit).skip(startIndex).exec();
                results.totalPageNumber = (Math.ceil(await model.find({ status: { $ne: true } }).count() / limit));
            } else {
                results.results = await model.find().limit(limit).skip(startIndex).exec();
                results.totalPageNumber = Math.ceil(await model.countDocuments().exec() / limit)
            }

            if (username) {
                results.results = await model.find({ username: { '$regex': username, '$options': 'i' } }).limit(limit).skip(startIndex).exec();
                results.totalPageNumber = (Math.ceil(await model.find({ username: { '$regex': username, '$options': 'i' } }).count() / limit));
            }
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

module.exports = paginatedResults