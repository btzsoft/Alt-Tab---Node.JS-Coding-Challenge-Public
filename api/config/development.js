module.exports = {
  server: {
    host: '127.0.0.1',
    port: process.env.PORT || 8088,
    allowOrigins: [
      'http://127.0.0.1:3000',
      'http://alttab.co',
      'http://www.alttab.co',
      'https://alttab.co',
      'https://www.alttab.co',
    ]
  },
  mongodb: {
    connection: {
      host: '127.0.0.1',
      port: 27017,
      database: 'alttab',
      user: '',
      password: '',
    },
  },
}
