// module.exports = ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 1337),
//   url: env('', 'http://localhost:1337'),

//   admin: {
//     auth: {
//       secret: env('ADMIN_JWT_SECRET', 'c0583c9f09417037565ae8e4d71411968138ba20b412f89a358a221e15fd169e'),
//     },
//   },

// });

module.exports = ({ env }) => ({
  url: env('MY_HEROKU_URL'),
});