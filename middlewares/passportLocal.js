
const LocalStrategy = require('passport-local').Strategy;

const passport = require('passport');
const User = require('../models/userSchema');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        let user = await User.findOne({ email });
        if (user) {
            if (user.password == password) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        }
        else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findById(id);

        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }

    } catch (error) {
        return done(error, false);
    }
})

passport.AdminPassportAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
}

passport.setAdminAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.User = req.user;
    }
    next();
}

module.exports = passport;