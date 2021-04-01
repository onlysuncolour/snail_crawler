const routes = require("../routes.json")
const {pathToRegexp,  match } = require("path-to-regexp");

const matchRoute = function(req, res, routes, next) {
    const url = req.url.split('?')[0]
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        const routeMatch = match(route.name, { decode: decodeURIComponent });
        const result = routeMatch(url)
        if (result && req.method == route.method) {
            Object.assign(req.params, result.params)
            return {route, result}
        }
    }
    return null
}
const buildMiddleHandler = function(route) {
    try {
        let middlewareList = [];
        if (route.middlewares && route.middlewares.length > 0) {
            route.middlewares.forEach(m => {
                middlewareList.push(require(m))
            });
        }
        middlewareList.push(require(route.path))
        return middlewareList
    } catch (error) {
        console.log(error)
        return []
    }
}

module.exports = function(req, res, finalNext) {
    const route = matchRoute(req, res, routes, finalNext);
    const middlewares = route ? buildMiddleHandler(route.route) : [];
    
    if (!route || middlewares.length == 0) {
        res.status(404).send()
        return
    }

    var len = middlewares.length;
    var i=-1;

    function next(err) {
        if (err) {
            return finalNext(err);
        }
        i++;

        if (i === len) {
            finalNext();
        } else {
            middlewares[i](req, res, next);
        }
    }

    next()
}