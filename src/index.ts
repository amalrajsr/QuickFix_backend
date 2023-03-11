import express,{Request,Response,NextFunction} from 'express'
import dotenv from 'dotenv';
import userRoute from './api-routes/user_route'
import dbConnection from './config/database';
import errorHandler from './middleware/errorHandler';
import session from "express-session";
import IUserData from 'interface/interface';
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use((express.json()))
app.use(express.urlencoded({ extended: true }));

app.use(cors(
  {
      origin:['http://localhost:3000'],
      methods:['GET','POST','PUT','PATCH','DELETE'],
      credentials:true
  }
  ))
  
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    
  }))

  declare module "express-session" {
    interface SessionData {
        user: IUserData
    }
}
  
  app.use('/api/v1/user',userRoute)

// golbal error handler
app.use('*',errorHandler)
// connecting to database
dbConnection()
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

