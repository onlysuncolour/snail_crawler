const request = require('request')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const getCrawlerValuableListService = require('../service/get-crawler-valuable-list-service')

module.exports = function(payload) {
    return new Promise((res, rej) => {
        if (!payload.level) {
          res([])
          return  
        }
        getCrawlerValuableListService(payload.source).then(list => {
            list = list.filter(i => i.level == payload.level)
            list = [list[0], list[1]]
            // const list = [{href: "https://m.ali213.net/wiki/zqwn/gzwp35.html"}]
            let delay = 0;
            const promises = list.map(i => getValuable(i, delay++, payload.source))
            Promise.all(promises)
            .then((results, err) => {
                if (err) {
                    res([])
                    return
                }
                res(results.filter(i => !!i))
            })
        })
    })
}


function getValueFromDom(dom, className, index = 0, splitFlag) {
    let result = ""
    try {
        result = dom.window.document.getElementsByClassName(className)[index].textContent;
        if (splitFlag) {
            result = splitText(result, splitFlag)
        }
    } catch (error) {
        result = ""
    }
    return result
}

function splitText (text, splitFlag) {
    let result = text.split(splitFlag).map((item, index, array) => {
        if (item.startsWith('每') && !item.startsWith('每日') && !item.startsWith('每研究10级基因，获得90白蝌蚪') && !(item.startsWith('每合成') && item.includes('炼金试剂')) && !item.startsWith('每穿戴') && !item.startsWith('每次') && !item.startsWith('每上阵') && !item.startsWith('每天') && item.indexOf('当前') == -1 && item.indexOf('上限') == -1) {
            array[index+1] = item + '\n' +  array[index+1]
            return ''
        }
        return item
    }).filter(i => !!i)
    return result
}

function getValuable(valuable, delay, source = 0) {
    return new Promise((res, rej) => {
        setTimeout( _ => {
            request({
                uri: valuable.href,
                method: 'GET'
            }, (err, response, body) => {
                if (err) {
                    console.log(err)
                }
                try {
                    const dom = new JSDOM(body);
                    const item = buildValuable[source](dom, valuable)
                    res(item)
                } catch (error) {
                    res(null)
                }
            })
        }, delay)
    })
}

const buildValuable = [
    function(dom, valuable) {
        const item = {
            title: getValueFromDom(dom, 'st2'),
            description: getValueFromDom(dom, 'st3'),
            level: getValueFromDom(dom, 'st6', 0),
            t1: getValueFromDom(dom, 'st8', 0),
            t2: getValueFromDom(dom, 'st6', 1),
            t3: getValueFromDom(dom, 'st8', 1),
            t4: getValueFromDom(dom, 'st6', 2),
            t5: getValueFromDom(dom, 'st8', 2),
            access: getValueFromDom(dom, 'st18', 0, '、'),
            setSkill: getValueFromDom(dom, 'st28', 0, '\n'),
            skill: getValueFromDom(dom, 'st23', 0, '\n'),
        }
        return item;
    },
    function(dom, valuable) {
        const item = {}
        const page = dom.window.document.getElementsByClassName('mw-parser-output')[0];
        let [, y, z, mainDataDiv, accessDiv, descriptionDiv] = page.children
        mainDataDiv = mainDataDiv.lastElementChild;
        item.title = dom.window.document.getElementById('firstHeading').textContent.trim();
        item.access = accessDiv.children.length > 1 ? splitText(accessDiv.lastElementChild.innerHTML.trim(), '<br>') : [];
        item.description = descriptionDiv.lastElementChild.textContent;
        let [w, attrDiv, skillDiv, setSkillDiv] = mainDataDiv.children;
        [...attrDiv.getElementsByTagName('tr')].forEach((v, i) => {
            item[`t${i+1}`] = v.children[1].textContent.trim()
        })
        item.skill = skillDiv.children.length > 1 ? splitText(skillDiv.lastElementChild.innerHTML.trim(), '<br>') : [];
        item.setSkill = setSkillDiv.children.length > 1 ? splitText(setSkillDiv.lastElementChild.innerHTML.trim(), '<br>') : [];
        item.level = valuable.level;
        if (item.skill.length == 1 && item.skill[0] == '待完善') {
            item.skill = []
        };
        return item;
    }
]