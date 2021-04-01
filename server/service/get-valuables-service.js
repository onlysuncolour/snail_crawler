const fileRead = require('./file-read')

module.exports = function(payload) {
    return new Promise((res, rej) => {
        fileRead('valuables.json').then(response => {
            let result = response.result || [];
            if (payload.level) {
                result = result.filter(i => i.level == payload.level)
            }
            res({list: result});
            return;
        })
    })
}