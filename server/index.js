import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import db from "./app/models/index.js";
import auth from "./app/routes/auth.js";
import user from "./app/routes/user.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8082",
// };

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const __dirname = path.resolve();
app.use("/static", express.static(path.join(__dirname, "public")));

const User = db.user;

function initial() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        firstname: "admin",
        lastname: "",
        email: process.env.ADMIN_EMAIL,
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
        role: "ADMIN",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Admin' user");
      });
    }
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to HelixSense application." });
});

app.use("/api/auth", auth);
app.use("/api/user", user);

// set port, listen for requests
const PORT = process.env.PORT || 8081;

db.mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
