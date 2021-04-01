const request = require('request')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function(source = 0) {
    return new Promise((res, rej) => {
        request({
            uri: urls[source],
            method: 'GET'
        }, (err, response, body) => {
            if (err) {
                console.log(err)
            }
            const dom = new JSDOM(body);
            let lists = buildListData[source](dom, source)
            res(lists);
        })
    })
}

const urls = [
    'https://m.ali213.net/wiki/zqwn/zqwngzwny/index.html',
    'https://wiki.biligame.com/zqwn/%E8%B4%B5%E9%87%8D%E5%93%81%E5%9B%BE%E9%89%B4',
]

const buildListData = [
    function(dom, source) {
        let lists = dom.window.document.getElementsByClassName('imgsxlist')
        lists = [...lists].map(i => ({
            title: i.title,
            href: i.href,
            level: i.dataset.pingjie,
            source
        }))
        return lists
    },
    function(dom, source) {
        let table = dom.window.document.getElementById('CardSelectTr')
        let lists = [...table.getElementsByTagName('tr')];
        lists.shift();
        lists = lists.map(tr => {
            let tds = tr.getElementsByTagName('td')
            return {
                title: tds[0].firstElementChild.lastElementChild.textContent.trim(),
                href: 'https://wiki.biligame.com' + tds[0].firstElementChild.lastElementChild.firstElementChild.href,
                level: tds[1].textContent.trim(),
                source
            }
        })
        return lists
    }
]
