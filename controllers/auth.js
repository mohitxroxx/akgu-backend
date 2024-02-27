const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (user) {
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                const token = jwt.sign({
                    username: user.username,
                    role: user.role
                }, process.env.JWT_SECRET, { expiresIn: '2d' })

                return res.status(200).cookie('auth', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    expires: new Date(Date.now() + 25892000),
                }).cookie('user', user.role , {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    expires: new Date(Date.now() + 25892000),
                }).json({msg:'Logged in successfully'})
            }
        }
        return res.status(500).send('wrong credentials')
    } catch (err) {
        next(err) 
    }
}

exports.logout = (req, res, next) => {
    res.clearCookie('auth')
    res.clearCookie('user')
    res.status(200).send("User Logged out and session ended")
}

exports.signup = async (req, res, next) => {
    const { username, password, email, role } = req.body
    try {
        if (password.length < 8) {
            return res.status(400).json({msg: 'failed' })
        }
        const chk=await User.findOne({username:req.body.username})
        if(chk)
            return res.status(403).json({msg:'Username already exists'})
        const hash = await bcrypt.hash(password, 10)
        const user = await new User({
            password: hash, 
            username, 
            email, 
            role 
        }).save()
            return res.status(200).json({ msg: 'Signed up successfully',
            data: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        next(err)
    }
}

exports.updatePassword = async (req, res, next) => {
    const { password, new_pass, conf_pass } = req.body
    try {
        if (new_pass !== conf_pass || new_pass.length < 8) {
            return res.status(400).json({msg: 'Make sure to new pass and confirm pass is same and the password is more than 7 characters'})
        }
        const user = await User.findOne({ username: req.user.username })
        const chk = await bcrypt.compare(password, user.password)
        if(!chk) {
            return res.status(403).json({msg: 'Wrong Passs'})
        }
        const hash = await bcrypt.hash(new_pass, 10)
        user.password = hash
        await user.save()
        return res.status(200).json({msg: 'changed successfully'})
    } catch (err) {
        next(err)
    }
}
