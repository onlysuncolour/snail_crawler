const fs = require('fs')
module.exports = function (filename, data) {
    return new Promise((res, rej) => {
        fs.writeFile(`${__dirname}/../saves/${filename}`, JSON.stringify(data), (err) => {
            res({
                success: !err
            })
        })
    })
}