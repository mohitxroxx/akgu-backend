const user=require('../models/user')
const roles = ['member','admin']

const authorization = (role) => {
    return (req, res, next) => {
        console.log(req.cookies.user)
        if(!req.cookies.user)
        return res.status(403).json({
            message: 'User isnt logged in'
        })
        if (roles.indexOf(req.cookies.user) < roles.indexOf(role)) {
            return res.status(403).json({
                message: 'User isnt allowed to access this service'
            })
        }
        next()
    }
}

module.exports = authorization