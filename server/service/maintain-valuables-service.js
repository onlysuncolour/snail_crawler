const fileWrite = require('./file-write')
const fileRead = require('./file-read')
const util = require('../utils/util')
const VUtil = require('../utils/valuable-util')

module.exports = function(payload) {
    return new Promise((res, rej) => {
        fileRead('valuables.json').then(({result: valuables}) => {
            valuables.forEach(i => {
                i.tags = VUtil.setTag(i)
                i.prefer = VUtil.setPreffer(i)
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
    })
}