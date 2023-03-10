
import mongoose  from "mongoose";

  const dbConnection=()=>{

const uri:string= process.env.MONGOURI || "mongodb://127.0.0.1:27017/quickfix"
mongoose.set('strictQuery',true);

//Database connection
mongoose.connect(uri).then(()=>{
    console.log('Database running successfully')
}).catch((err)=>{
    console.log(err);
})
}

export default dbConnection