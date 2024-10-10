const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const accessController = require('../controllers/accessController');
const accessMiddleware = require('../middleware/accessMiddleware');

const tokenBlacklist = new Set();

router.post('/access/register', accessController.register);
router.post('/access/login', accessController.login);
router.post('/access/refresh-token', accessController.refreshToken);
router.post('/access/reset-password-request', accessController.requestPasswordReset);
router.post('/access/reset-password', accessController.resetPassword);
router.post('/access/logout', accessController.logout);

const checkBlacklist = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Token non valido' });
  }
  next();
};

router.use('/access/protected', checkBlacklist, accessMiddleware);
router.use('/account', checkBlacklist, accessMiddleware);

module.exports = router;