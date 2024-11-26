const { Router } = require("express");
const userCtl = require('../controllers/userController')
const passport = require("passport");
const userRouter = Router();

userRouter.post('/login', passport.authenticate('local', { failureRedirect: "/login" }),userCtl.loginCreate)
userRouter.get('/signup',userCtl.signupPage)
userRouter.get('/signup',userCtl.signup)
userRouter.post('/signup',userCtl.signupCreate)
userRouter.get('/login',userCtl.login)
userRouter.get('/logout',userCtl.logoutUser)


userRouter.use(passport.AdminPassportAuth);

userRouter.get('/',userCtl.indexPage)


module.exports = userRouter;