const fileWrite = require('./file-write')
const fileRead = require('./file-read')
const util = require('../utils/util')
const valuableUtil = require('../utils/valuable-util')

module.exports = async function(payload) {
    return new Promise((res, rej) => {
        if (payload.valuable && payload.type) {
            valuableUtil.setTag(payload.valuable)
            valuableUtil.setPreffer(payload.valuable)
            Promise.all([fileRead('valuables.json'), fileRead('valuable-list.json')]).then(([{result: valRes}, {result: listRes}]) => {
                const {item: curListItem, index: curListItemIndex} = util.getItemAndIndexFromArray(payload.valuable, 'title', listRes, "title", true)
                const {item: curValItem, index: curValItemIndex} = util.getItemAndIndexFromArray(payload.valuable, 'title', valRes, "title", true)
                if (payload.type === 'delete') {
                    if (!curListItem || !curValItem) {
                        rej();
                        return
                    } else {
                        listRes = listRes.filter( i => i != curListItem)
                        valRes = valRes.filter( i => i != curValItem)
                    }
                } else if (payload.type === 'edit') {
                    if (!curListItem || !curValItem) {
                        rej();
                        return
                    } else {
                        listRes[curListItemIndex] = {
                            title: payload.valuable.title,
                            level: payload.valuable.level
                        }
                        valRes[curValItemIndex] = payload.valuable
                    }
                } else if (payload.type === 'add') {
                    if (curListItem || curValItem) {
                        rej()
                        return;
                    } else {
                        listRes.push({
                            title: payload.valuable.title,
                            level: payload.valuable.level
                        })
                        valRes.push(payload.valuable)
                    }
                }
                Promise.all([fileWrite('valuables.json', valRes), fileWrite('valuable-list.json', listRes)]).then(results => {
                    if(results[0].success && results[1].success) {
                        res({success: true})
                    } else {
                        rej()
                    }
                }, err => {
                    rej(err)
                });
            });
            return;
        }
        rej();
    })
}