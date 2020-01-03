const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const expressSession = require('express-session');

// Production
// Use secure cookies in production (requires SSL/TLS)
// sess.cookie.secure = true;

const session = ({ secure, secret }) => expressSession({
  secret,
  cookie: { secure },
  resave: false,
  saveUninitialized: true
});

const auth = ({ domain, clientId, clientSecret, callbackURL }) => {
  const strategy = new Auth0Strategy(
    {
      domain,
      clientSecret,
      callbackURL,
      clientID: clientId,
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      console.log(extraParams);
      return done(null, profile, extraParams || {});
    }
  );

  passport.use(strategy);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  return passport;
}


module.exports = { session, auth, cors: (config) => cors(config) };
