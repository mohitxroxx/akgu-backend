const roles = ['admin', 'member']

const authorization = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({
                message: 'User not logged in'
            })
        }
        if (roles.indexOf(req.user.role) > roles.indexOf(role)) {
            return res.status(403).json({
                message: 'User isnt allowed to access this service'
            })
        }
        next()
    }
}

module.exports = authorization
