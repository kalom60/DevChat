import express from 'express';
import MessagesController from '../controllers/MessagesController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import AuthenticateToken from '../middlewares/auth';
import RefreshTokenController from '../controllers/RefreshTokenController';
import VerifyEmail from '../controllers/VerifyEmail';

const router = express.Router();

// routes to usercontroller
router.post('/register', UsersController.newUser);
router.get('/me', AuthenticateToken.verifyToken, UsersController.getMe);
router.put('/edit', AuthenticateToken.verifyToken, UsersController.editMe); // not yet made
router.get('/dev', AuthenticateToken.verifyToken, UsersController.getDev);
router.get('/users', UsersController.allUsers);

// routes to messagecontroller
router.post('/msg', AuthenticateToken.verifyToken, MessagesController.newMsg);
router.get('/msg', AuthenticateToken.verifyToken, MessagesController.getMsg);

// routes to AuthController
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

// route to refresh token
router.get('/refresh', RefreshTokenController.handleRefreshToken);

// route to verify email
router.get('/user/verify-email', VerifyEmail.verify);

export default router;
