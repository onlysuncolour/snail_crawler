const Ajax = require('./ajax').default
module.exports = {
  Valuable: {
    getValuableList(param) {
      return Ajax.get('/valuable/getValuableList', param)
    },
    getValuables(param) {
      return Ajax.get('/valuable/getValuables', param)
    },
    getValuable(param) {
      return Ajax.get('/valuable/getValuable', param)
    },
    getCrawlerValuableList(param) {
      return Ajax.get('/valuable/getCrawlerValuableList', param)
    },
    getCrawlerValuables(param) {
      return Ajax.get('/valuable/getCrawlerValuables', param)
    },
    saveValuableList(param) {
      return Ajax.post('/valuable/saveValuableList', param)
    },
    saveValuables(param) {
      return Ajax.post('/valuable/saveValuables', param)
    },
    saveValuable(param) {
      return Ajax.post('/valuable/saveValuable', param)
    },
  },
}
