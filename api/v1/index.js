const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const authAPI = require('./auth');

const app = express();

app.use(express.json());

module.exports = (db, { auth, cookie, cors }) => {

  const passport = middlewares.auth(auth);
  app.use(helmet());
  app.use(middlewares.cors(cors));
  app.use(middlewares.session(cookie));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  // Uncomment the line below if your application is behind a proxy
  // (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  app.enable('trust proxy');


  const router = authAPI(
    db,
    app,
    {
      scope: auth.scope,
      redirectURL: auth.redirectURL,
      secure: cookie.secure,
      domain: cookie.domain,
      path: cookie.path,
    }
  );

  app.use('/v1', router);

  app.get('/test', function(req, res) {
    console.log('test');
    res.json(req.headers);
  });

  app.disable('x-powered-by')

  return app;
};
