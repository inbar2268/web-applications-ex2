
import express, { Express } from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postsRoute from "./routes/posts_route";
import commentsRoute from "./routes/comments_route";
import usersRoute from "./routes/users_route";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web Application - ex2",
      version: "1.0.0",
      description: "REST server including authentication using JWT",
    },
    servers: [{ url: "http://localhost:3000", },],
  },
  apis: ["./routes/*.ts"],
};

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const initApp = () => {
  return new Promise<Express>((resolve, reject) => {
    if (!process.env.DB_CONNECT) {
      reject("DB_CONNECT is not defined in .env file");
    } else {
      mongoose
        .connect(process.env.DB_CONNECT)
        .then(() => {
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({extended: true}));
          app.use("/posts", postsRoute);
          app.use("/comments", commentsRoute);
          app.use("/users", usersRoute);
          resolve(app);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

const port = process.env.PORT;
initApp().then((app) => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
