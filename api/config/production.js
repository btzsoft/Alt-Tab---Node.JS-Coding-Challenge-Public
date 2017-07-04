module.exports = {
  server: {
    host: '127.0.0.1',
    port: process.env.PORT || 8088,
    allowOrigins: [
      'http://alttab.co',
      'http://www.alttab.co',
      'https://alttab.co',
      'https://www.alttab.co',
    ]
  },
  mongodb: {
    connection: {
      host: '1.2.3.4',
      port: 27017,
      database: 'alttab',
      user: '',
      password: '',
    },
  },
};
