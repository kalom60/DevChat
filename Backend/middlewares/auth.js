import jwt from 'jsonwebtoken';

class AuthenticateToken {
  static async verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.json('No token');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_id) => {
      if (err) return res.json(err);
      req.user = user_id;
      next();
    });
  }
}

export default AuthenticateToken;
