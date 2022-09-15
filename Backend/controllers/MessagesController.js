import Message from '../models/Message';
import User from '../models/User';
import ObjectId from 'mongoose';

class MessagesController {
  static async newMsg(req, res) {
    const { text, sender, conversation } = req.body;
    const msg = { text, sender, conversation };

    const newmsg = new Message(msg);
    console.log(newmsg);
    await newmsg.save();

    const user = await User.findOne({ _id: sender });
    console.log(user);
    if (user) {
      const reciver = user.chatRoom.filter((mem) => mem === conversation[1]);
      if (reciver.length == 0) {
        user.chatRoom.push(conversation[1]);
        await user.save();
      } else {
        console.log('already found', reciver);
      }
    } else {
      console.log('no user');
    }
    return res.json(newmsg);
  }

  static async getMsg(req, res) {
    const { dev } = req.query;
    const user = req.user.id;

    if (!dev) {
      console.log('no ids');
      return;
    }

    if (dev !== null) {
      const convo = await Message.find({ conversation: [user, dev] });
      const convo1 = await Message.find({ conversation: [dev, user] });
      if (!convo) return res.json('No conversation');
      // console.log(convo);

      const { text, sender } = convo[0];
      const receiver = convo[0].conversation[1];

      const from = { text, sender, receiver };
      let to = {};

      if (convo1.length > 0) {
        const text1 = convo1[0].text;
        const sender1 = convo1[0].sender;
        const receiver1 = convo1[0].conversation[1].receiver;
        to = { text1, sender1, receiver1 };
      }

      return res.json({ from, to });
    }
  }
}

export default MessagesController;
