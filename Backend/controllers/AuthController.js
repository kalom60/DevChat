require('dotenv').config();
import bcrypt from 'bcrypt';
import GenerateToken from '../middlewares/generateToken';
import User from '../models/User';
import redisClient from '../utils/redis';

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(404).json('No user');
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        const id = user._id.toString();
        const user_id = { id: id };

        const token = await GenerateToken.generateAccessToken(user_id);
        const refreshToken = await GenerateToken.generateRefreshToken(user_id);

        await redisClient.set(refreshToken, id, 300);
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 5 * 60 * 1000,
        });
        res.json({ token });
      } else {
        res.json('Wrong Password');
      }
    } catch (err) {
      res.json(err);
    }
  }

  static async logout(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refToken = cookies.jwt;

    const user = redisClient.get(refToken);
    if (!user) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'lax',
      });
      res.sendStatus(204);
    }

    await redisClient.del(refToken);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'lax' });
    res.sendStatus(204);
  }
}

export default AuthController;
