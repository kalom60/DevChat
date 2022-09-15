require('dotenv').config();
import nodemailer from 'nodemailer';
import GenerateToken from '../middlewares/generateToken';
import User from '../models/User';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

class UsersController {
  static async newUser(req, res) {
    const slug = `http://localhost.com/${req.body.userName}`;
    const address = req.body.address;
    address.email = req.body.email;
    const emailToken = await GenerateToken.generateAccessToken({
      email: req.body.email,
    });

    const newuser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      github: req.body.github,
      linkedIn: req.body.linkedIn,
      image: req.body.photo,
      emailToken,
      expreience: req.body.expreience,
      title: req.body.title,
      address,
      slug,
    };

    const user = new User(newuser);
    const mailOption = {
      from: process.env.Email,
      to: user.email,
      subject: 'DevChat -verify your email',
      html: `<h2> ${user.userName}! Thanks for registering on our site </h2> 
      <h4> Please verify your email to continue... </h4> 
      <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verfiy Your Email  </a>`,
    };

    try {
      await user.save();
    } catch (err) {
      const errs = err.message.split(':')[3].split(' ')[2];
      return res.status(404).json(`${errs} already exist`);
    }
    console.log(user);
    transporter.sendMail(mailOption, (error, info) => {
      if (error) console.log(error);
      else console.log('Verification email sent', info);
    });
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
    const { id } = req.query;
    console.log(id);

    const user = await User.findOne({ _id: id });
    if (user === null) return res.json('Wrong id');

    const {
      firstName,
      lastName,
      address,
      email,
      github,
      expreience,
      title,
      userName,
    } = user;

    return res.json({
      firstName,
      lastName,
      address,
      email,
      github,
      expreience,
      title,
      userName,
    });
  }

  static async allUsers(req, res) {
    try {
      const users = await User.find();
      // console.log(users);
      return res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}

export default UsersController;
