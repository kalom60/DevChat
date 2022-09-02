require('dotenv').config();
import User from '../models/User';

class UsersController {
  static async newUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      userName,
      github,
      linkedIn,
      image,
      expreience,
      title,
      address,
    } = req.body;

    const slug = `http://localhost.com/${userName}`;
    address.email = email;

    const newuser = {
      firstName,
      lastName,
      email,
      password,
      userName,
      github,
      linkedIn,
      image,
      expreience,
      title,
      address,
      slug,
    };

    const user = new User(newuser);
    await user.save();
    // console.log(user);
    return res.status(200).json(user);
  }

  static async getMe(req, res) {
    const user_id = req.user.id;
    const user = await User.findOne({ _id: user_id });
    // console.log(user);
    return res.json({ user });
  }

  static async editMe(req, res) {}

  static async getDev(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });
    if (user === null) return res.json('Wrong id');

    const { firstName, lastName, address, email, github, expreience, title } =
      user;

    return res.json({
      firstName,
      lastName,
      address,
      email,
      github,
      expreience,
      title,
    });
  }
}

export default UsersController;
