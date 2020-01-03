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
    },
    cookie: {
      secure: true,
      secret: 'LasCosasSonBizarras',
    },
  },
  database: {
    database: 'db_staging',
  },
};
