module.exports = {
  api: {
    cors: {
      origin: [
        'https://esice.co',
      ],
      credentials: true,
    },
    port: 3000,
    auth: {
      domain: '',
      scope: 'openid email profile',
      clientId: '',
      clientSecret: '',
      callbackURL: 'https://auth.esice.co/v1/callback',
      redirectURL: 'https://esice.co',
    },
    cookie: {
      secure: true,
      secret: '',
      domain: '.esice.com',
    },
  },
  database: {
    database: 'db_production',
  },
};
