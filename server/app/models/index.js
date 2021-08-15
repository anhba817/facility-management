import mongoose from "mongoose";
import user from "./user.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = user;

export default db;
