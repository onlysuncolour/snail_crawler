const fileWrite = require('./file-write')
const fileRead = require('./file-read')
const util = require('../utils/util')
const valuableUtil = require('../utils/valuable-util')

module.exports = function(payload) {
    return new Promise((res, rej) => {
        if (payload.list && payload.list instanceof Array) {
            fileRead('valuables.json').then(({result: valuables}) => {
                payload.list.forEach(i => {
                    valuableUtil.setTag(i)
                    valuableUtil.setPreffer(i)
                    util.replaceItemForArray(i, "title", valuables)
                })
                fileWrite('valuables.json', valuables).then(result => {
                    if (result) {
                        res({success: true})
                    } else {
                        rej()
                    }
                })
            })
            return;
        }
        rej()
    })
}