require('dotenv').config();
import jwt from 'jsonwebtoken';
import redisClient from '../utils/redis';
import GenerateToken from '../middlewares/generateToken';

class RefreshTokenController {
  static async handleRefreshToken(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refToken = cookies.jwt;
    const user = await redisClient.get(refToken);
    if (!user) return res.sendStatus(403);

    jwt.verify(
      refToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || user !== decoded.id) return res.sendStatus(403);
        const user_id = { id: user };
        const accessToken = await GenerateToken.generateAccessToken(user_id);
        res.json({ accessToken });
      }
    );
  }
}

export default RefreshTokenController;
