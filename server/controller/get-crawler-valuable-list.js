const service = require('../service/get-crawler-valuable-list-service')

module.exports = function(req, res, next) {
    service(req.query.source).then(response => {
        res.status(200).send({list: response});
    })
}