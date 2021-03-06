module.exports = {
  api: {
    cors: {
      origin: [
        'https://esice.co',
      ],
      credentials: true,
    },
    port: 80,
    auth: {
      domain: '',
      scope: 'openid email profile',
      clientId: '',
      clientSecret: '',
      callbackURL: 'https://auth.esice.co/v1/callback',
      redirectURL: 'https://app.esice.co',
    },
    cookie: {
      secure: true,
      secret: '',
      domain: '.esice.co',
      proxy: true,
      path: '/',
    },
  },
  database: {
    database: 'db_production',
  },
};
