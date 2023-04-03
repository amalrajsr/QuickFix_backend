import express from 'express'
import dotenv from 'dotenv';
import userRoute from './routes/userRoute'
import adminRoute from './routes/adminRoute'
import dbConnection from './config/database';
import errorHandler from './middleware/errorHandler';
import session from "express-session";
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use((express.json()))
app.use(express.urlencoded({ extended: true }));
app.use(
  mongoSanitize({
    allowDots: true,
  }),
);

app.use(cors(
  {
      origin:['http://localhost:3000'],
      methods:['GET','POST','PUT','PATCH','DELETE'],
      credentials:true
  }
  ))
  
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET as string,
    
  }))

//   declare module "express-session" {
//     interface SessionData {
//         user: IUserData
//     }
// }
  
  app.use('/api/v1/user',userRoute)
  app.use('/api/v1/admin',adminRoute)
   
// golbal error handler
app.use('*',errorHandler)

// connecting to database
dbConnection()

app.listen(port, () => {
 
  console.log(`Server is running at http://localhost:${port}`);
});

