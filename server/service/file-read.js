const fs = require('fs')

module.exports = function (filename) {
    return new Promise((res) => {
        fs.readFile(`${__dirname}/../saves/${filename}`, (err, data) => {
            if (err) {
                res({result: null})
            } else {
                res({result: JSON.parse(data)})
            }
        })
    })
}