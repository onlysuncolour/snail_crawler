const service = require('../service/get-valuable-list-service')

module.exports = function(req, res, next) {
    service().then(response => {
        res.status(200).send({list: response});
    })
}