const fileWrite = require('./file-write')
const util = require('../utils/util');
const fileRead = require('./file-read');

module.exports = function(payload) {
    return new Promise((res, rej) => {
        if (payload.list && payload.list instanceof Array) {
            fileRead('valuable-list.json').then(({result: list}) => {
                payload.list.forEach(i => util.replaceItemForArray(i, "title", list))
                fileWrite('valuable-list.json', list).then(result => {
                    if (result.success) {
                        res({success: true})
                    } else {
                        rej()
                    }
                })
            })
            return;
        } else {
            rej();
        }
    })
}