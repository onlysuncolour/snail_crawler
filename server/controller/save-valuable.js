const service = require('../service/save-valuable-service')

module.exports = function(req, res, next) {
    service({valuable: req.body.valuable, type: req.body.method}).then(response => {
        res.status(200).send(response);
    }, err => {
        res.status(503).send()
    })
}