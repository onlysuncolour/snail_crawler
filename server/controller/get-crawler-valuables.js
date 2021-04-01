const service = require('../service/get-crawler-valuables-service')

module.exports = function(req, res, next) {
    service({
        level: req.query.level, 
        source: req.query.source
    }).then(response => {
        res.status(200).send({list: response});
    })
}