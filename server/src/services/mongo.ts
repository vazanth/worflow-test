import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('Mongo DB connection ready!!!');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongo DB error', err);
});

export const mongoConnect = () => {
  mongoose.connect(MONGO_URL!, {
    useNewUrlParser: true, // uses to parse MongoDB connection strings
    useUnifiedTopology: true, // useUnifiedTopology option removes support for several connection options that are no longer relevant with the new topology engine
    useCreateIndex: true, //ensureIndex() dropped infavor of createIndex()
    useFindAndModify: false, //Make Mongoose use `findOneAndUpdate()` ---changed to--> findAndModify()
  });
};

export const mongoDisconnect = () => {
  mongoose.disconnect();
};
