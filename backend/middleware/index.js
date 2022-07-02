module.exports = function (options) {
    return function (req, res, next) {
        let token = req.headers.token
        if (!token || token != "admin") {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        next()
    }
  }