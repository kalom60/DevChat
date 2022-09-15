import User from '../models/User';

class VerifyEmail {
  static async verify(req, res) {
    const { token } = req.query;
    console.log(token);
    const user = await User.findOne({ emailToken: token });
    if (user) {
      user.confirmed = true;
      user.emailToken = null;
      await user.save();
      return res.redirect('http://localhost:3000/login');
    }
  }
}

export default VerifyEmail;
