module.exports = {
  api: {
    cors: {
      origin: [
        'https://staging.esice.co',
      ],
      credentials: true,
    },
    port: 80,
    auth: {
      domain: '',
      clientId: '',
      clientSecret: '',
      callbackURL: 'https://esice-auth-staging.heroku.com/v1/callback',
      redirectURL: '',
    },
    cookie: {
      secure: true,
      secret: '',
    },
  },
  database: {
    database: 'db_staging',
  },
};
