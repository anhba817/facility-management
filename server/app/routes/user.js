import authJwt from "../middlewares/authJwt.js";
import * as userController from "../controllers/user.js";
import * as emailController from "../controllers/email.js";
import express from "express";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/verify", [authJwt.verifyToken], userController.verifyToken);

router.post("/:email/reset_password", emailController.sendPasswordResetEmail);

router.post(
  "/:userId/receive_new_password/:token",
  emailController.receiveNewPassword
);

export default router;
