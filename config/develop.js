module.exports = {
  api: {
    cors: {
      origin: [
        'http://app.esice.local:3000',
      ],
      credentials: true,
    },
    port: 8080,
    auth: {
      domain: '',
      scope: 'openid email profile',
      clientId: '',
      clientSecret: '',
      callbackURL: 'http://auth.esice.local:8080/v1/callback',
      redirectURL: 'http://app.esice.local:3000',
    },
    cookie: {
      secure: false,
      secret: 'secret',
      domain: '.esice.local',
    },
  },
  database: {
    database: 'db_develop',
  },
};
