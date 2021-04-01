const service = require('../service/save-valuable-list-service')

module.exports = function(req, res, next) {
    service({list: req.body.list}).then(response => {
        res.status(200).send(response);
    }, err => {
        res.status(503).send()
    })
}