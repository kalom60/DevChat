import Message from '../models/Message';

class MessagesController {
  static async newMsg(req, res) {
    const { text, sender, conversation } = req.body;
    const msg = { text, sender, conversation };

    const newmsg = new Message(msg);
    console.log(newmsg);
    await newmsg.save();
    return res.json(newmsg);
  }

  static async getMsg(req, res) {
    const { user_id, dev_id } = req.body;

    if (user_id !== null && dev_id !== null) {
      const convo = await Message.find({ conversation: [user_id, dev_id] });
      if (!convo) return res.json('No conversation');
      // console.log(convo);

      const { text, sender } = convo[0];
      const receiver = convo[0].conversation[1];

      return res.json({ text, sender, receiver });
    }
  }
}

export default MessagesController;
