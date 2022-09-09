import User from '../models/User';

class UsersController {
  static async newUser(req, res) {
    const slug = `http://localhost.com/${req.body.userName}`;
    const address = req.body.address;
    address.email = req.body.email;

    const newuser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      github: req.body.github,
      linkedIn: req.body.linkedIn,
      image: req.body.image,
      expreience: req.body.expreience,
      title: req.body.title,
      address,
      slug,
    };

    const user = new User(newuser);
    try {
      await user.save();
    } catch (err) {
      const errs = err.message.split(':')[3].split(' ')[2];
      return res.status(404).json(`${errs} already exist`);
    }
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

  static async allUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}

export default UsersController;
