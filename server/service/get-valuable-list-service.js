const fileRead = require('./file-read')

module.exports = function() {
    return new Promise((res, rej) => {
        fileRead('valuable-list.json').then(response => {
            res(response.result);
            return;
        })
    })
}
