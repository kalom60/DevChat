require('dotenv').config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user === null) {
      return res.status(404).json();
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        const id = user._id.toString();
        const user_id = { id: id };
        const token = jwt.sign(user_id, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token });
      } else {
        res.json('Wrong Password');
      }
    } catch (err) {
      res.json(err);
    }
  }

  static async logout(req, res) {}
}

export default AuthController;
