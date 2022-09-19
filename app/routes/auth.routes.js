const { verifySignUp } = require('../middleware'); // Import for Verify
const controller = require('../controllers/auth.controller'); // Import Controller

module.exports = function(app) {
  // Untuk Akses Token
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // POST SignUp
  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  // Post Login
  app.post('/api/auth/signin', controller.signin);
};