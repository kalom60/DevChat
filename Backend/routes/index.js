require('dotenv').config();
import express from 'express';
import jwt from 'jsonwebtoken';
import MessagesController from '../controllers/MessagesController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

// routes to usercontroller
router.post('/register', UsersController.newUser);
router.get('/me', UsersController.getMe);
router.put('/edit', UsersController.editMe); // not yet made
router.get('/dev/:id', UsersController.getDev);

// routes to messagecontroller
router.post('/msg', MessagesController.newMsg);
router.get('/msg', MessagesController.getMsg);

// routes to AuthController
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

export default router;

function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  //   console.log(token);
  if (token === null) return res.json('No token');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_id) => {
    if (err) return res.json('Wrong token');
    req.user = user_id;
    next();
  });
}
