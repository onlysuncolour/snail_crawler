const fs = require('fs')

var data = [
    {
        "title": "论语",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp4.html",
        "level": "SSS"
    },
    {
        "title": "小男孩",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp10.html",
        "level": "SSS"
    },
    {
        "title": "人造黑洞",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp9.html",
        "level": "SSS"
    },
    {
        "title": "浮士德",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp8.html",
        "level": "SSS"
    },
    {
        "title": "神曲",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp7.html",
        "level": "SSS"
    },
    {
        "title": "黄金麦穗",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp6.html",
        "level": "SSS"
    },
    {
        "title": "孙子兵法",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp5.html",
        "level": "SSS"
    },
    {
        "title": "达芬奇手稿",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp3.html",
        "level": "SSS"
    },
    {
        "title": "天方夜谭",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp2.html",
        "level": "SSS"
    },
    {
        "title": "阿基米德的杠杆",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp1.html",
        "level": "SSS"
    },
    {
        "title": "灵魂容器",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp33.html",
        "level": "SSS"
    },
    {
        "title": "奥斯帕克能量魔方",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp28.html",
        "level": "SSS"
    },
    {
        "title": "不列颠百科全书",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp26.html",
        "level": "SSS"
    },
    {
        "title": "物种起源",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp25.html",
        "level": "SSS"
    },
    {
        "title": "国会荣誉勋章",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp24.html",
        "level": "SSS"
    },
    {
        "title": "战争论",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp23.html",
        "level": "SSS"
    },
    {
        "title": "盖亚之手",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp29.html",
        "level": "SSS"
    },
    {
        "title": "凤凰的羽毛",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp30.html",
        "level": "SSS"
    },
    {
        "title": "海姆达尔的号角",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp31.html",
        "level": "SSS"
    },
    {
        "title": "筋斗云",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp32.html",
        "level": "SSS"
    },
    {
        "title": "阿努比斯天平",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp36.html",
        "level": "SSS"
    },
    {
        "title": "赫拉的孔雀羽扇",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp35.html",
        "level": "SSS"
    },
    {
        "title": "玛雅预言石板",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp34.html",
        "level": "SSS"
    },
    {
        "title": "普罗米修斯火炬",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp22.html",
        "level": "SSS"
    },
    {
        "title": "赫尔墨斯里拉琴",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp21.html",
        "level": "SSS"
    },
    {
        "title": "诸神的黄昏",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp20.html",
        "level": "SSS"
    },
    {
        "title": "麦哲伦的望远镜",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp27.html",
        "level": "SSS"
    },
    {
        "title": "旅行者1号",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp11.html",
        "level": "SSS"
    },
    {
        "title": "超级双螺旋模型",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp12.html",
        "level": "SSS"
    },
    {
        "title": "相对论手稿",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp13.html",
        "level": "SSS"
    },
    {
        "title": "粒子对撞机",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp14.html",
        "level": "SSS"
    },
    {
        "title": "非洲之星",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp15.html",
        "level": "SSS"
    },
    {
        "title": "愿望杯",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp16.html",
        "level": "SSS"
    },
    {
        "title": "雅典娜神像",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp17.html",
        "level": "SSS"
    },
    {
        "title": "大黑天绘卷",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp18.html",
        "level": "SSS"
    },
    {
        "title": "西斯廷圣母",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp19.html",
        "level": "SSS"
    },
    {
        "title": "司母戊鼎",
        "href": "https://m.ali213.net/wiki/zqwn/gzwp37.html",
        "level": "SSS"
    }
]

// fs.writeFileSync('./valuables.json', JSON.stringify(data))
var jsonFile = fs.readFileSync('./valuables.json')
console.log(JSON.parse(jsonFile))