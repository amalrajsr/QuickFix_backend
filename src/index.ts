import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";
import expertRoute from "./routes/expertRoute";
import chatRoute from './routes/chatRoute'
import dbConnection from "./config/database";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import { io } from "./config/socket";
import socketApi from "./utils/socketApi";
import notFound from "./utils/404";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  mongoSanitize({
    allowDots: true,
  })
);

app.use(
  cors({
    origin: ['*'],
    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);


app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/expert", expertRoute);
app.use("/api/v1/chat", chatRoute);
app.use("*",notFound)

// golbal error handler
app.use(errorHandler);

// connecting to database
dbConnection();

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// attach socket server with our server
io.attach(server);

socketApi();
