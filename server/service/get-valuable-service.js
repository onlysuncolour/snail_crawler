const fileRead = require('./file-read')

module.exports = function(payload) {
    return new Promise((res, rej) => {
        fileRead('valuables.json').then(response => {
            let result = {valuable: null};
            if (response.result && payload.title) {
                result.valuable = response.result.filter(i => i.title = payload.title)[0]
            }
            res(result);
            return;
        })
    })
}