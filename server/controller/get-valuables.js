const service = require('../service/get-valuables-service')

module.exports = function(req, res, next) {
    service({level: req.query.level}).then(response => {
        res.status(200).send(response);
    })

}