const User = require('../models/userSchema')

module.exports.indexPage = (req,res)=>{
    return res.render('index')
}

module.exports.login = (req,res)=>{
    return res.render('./pages/login')
}
module.exports.signupPage = (req,res)=>{
    return res.render('./pages/signup')
}

module.exports.signup = async(req,res)=>{
    try {
        let userData = await User.find({})
        return res.render('back',{userData})
    } catch (error) {
        console.log(error);
        return res.render('back')
    }
}

module.exports.signupCreate = async(req,res)=>{
    try {
        await User.create(req.body)
        return res.redirect('/login')
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}

module.exports.loginCreate = (req, res) => {
    res.redirect('/')
}

module.exports.logoutUser = (req,res)=>{
    req.logout(()=>{
        return res.redirect('/login')
    })
}