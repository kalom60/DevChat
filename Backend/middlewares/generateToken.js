require('dotenv').config();
import jwt from 'jsonwebtoken';

class GenerateToken {
  static async generateAccessToken(user) {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15s',
    });
    return token;
  }
  static async generateRefreshToken(user) {
    const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '5m',
    });
    return token;
  }
}

export default GenerateToken;
