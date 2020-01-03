const express = require('express');
const passport = require('passport');

const secured = function(req, res, next) {
  if (req.user) { return next(); }
  req.session.returnTo = req.originalUrl;
};

module.exports = (db, _app, { domain, scope, redirectURL, secure }) => {
  const router = express.Router();

  router.get('/login', passport.authenticate('auth0', { scope }), function (req, res) {
    console.log('Previously logged in');
    console.log(req);
    res.redirect(redirectURL);
  });

  router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, extraParams) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/v1/login'); }

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

  router.get('/logout', (req, res) => {
    res.cookie('esice-at', { expires: Date.now(0) });
    res.cookie('esice-pr', { expires: Date.now(0) });

    res.redirect(redirectURL);
  });

  // Perform session logout and redirect to homepage
  /*
  router.get('/logout', (req, res) => {
    req.logout();

    var returnTo = req.protocol + '://' + req.hostname;
    var port = req.connection.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo += ':' + port;
    }
    var logoutURL = new url.URL(
      util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
    );
    var searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
  });
  */

  return router;
}
