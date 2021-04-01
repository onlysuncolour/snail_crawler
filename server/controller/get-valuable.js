const service = require('../service/get-valuable-service')

module.exports = function(req, res, next) {
    service({title: req.query.title}).then(response => {
        res.status(200).send(response);
    })
}