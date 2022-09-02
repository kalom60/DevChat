import mongoose from 'mongoose';

class DBClient {
  constructor() {
    this.host = 'localhost';
    this.port = '27017';
    this.database = 'devchat';

    this.client = new mongoose.connect(
      `mongodb://${this.host}:${this.port}/${this.database}`,
      {
        useUnifiedTopology: true,
      }
    );
  }
}

const dbClient = new DBClient();

export default dbClient;
