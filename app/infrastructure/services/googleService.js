const passport = require('passport')
const GooglStrategy = require('passport-google-oauth2')

passport.use(new GooglStrategy({
    callbackURL: '/auth/google/redirect',
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET
}, () => {
     
})
)