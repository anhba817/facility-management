import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      firstname: String,
      lastname: String,
      email: String,
      password: String,
      company: String,
      role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    },
    { timestamps: true }
  )
);

export default User;
