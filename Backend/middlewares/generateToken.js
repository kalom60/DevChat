require('dotenv').config();
import jwt from 'jsonwebtoken';

class GenerateToken {
  static async generateAccessToken(user) {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
    return token;
  }
  static async generateRefreshToken(user) {
    const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '30m',
    });
    return token;
  }
}

export default GenerateToken;
