
import mongoose from "mongoose";

const dbConnection = () => {

  const uri: string = process.env.MONGOURI as string
  mongoose.set('strictQuery', true);

  //Database connection
  mongoose.connect(uri).then(() => {
    console.log('Database running successfully')
  }).catch((err) => {
    console.log(err);
  })
}

export default dbConnection
