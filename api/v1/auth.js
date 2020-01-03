const express = require('express');
const passport = require('passport');

module.exports = (db, _app, { path, domain, scope, redirectURL, secure }) => {
  const router = express.Router();

  router.get('/login', passport.authenticate('auth0', { scope }), function (req, res) {
    res.redirect(redirectURL);
  });

  router.get('/logout', (req, res) => {
    res.clearCookie('esice-at', { path, domain });
    res.clearCookie('esice-pr', { path, domain });

    res.redirect(redirectURL);
  });

  router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, extraParams) {
      if (err) {
        console.log(err);
        return next(err);
      }

      if (!user) {
        return res.redirect('/v1/login');
      }

      res.cookie(
        'esice-at',
        extraParams.access_token,
        { httpOnly: true, secure, domain }
      );

      res.cookie(
        'esice-pr',
        user,
        { httpOnly: false, secure, domain }
      );

      res.redirect(redirectURL);

      /*
      Sessions are not used. Therefore, the following code only points out
      how sessions should be managed

        req.logIn(user, function (err) {
          if (err) { return next(err); }
          res.cookie('cookieName', 'cookieValue');
          res.redirect(redirectURL);
        });

      */
    })(req, res, next);
  });

  return router;
}
