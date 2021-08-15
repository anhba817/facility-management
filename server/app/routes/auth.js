import verifySignUp from "../middlewares/verifySignUp.js";
import { signup, signin } from "../controllers/auth.js";
import express from "express";

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup", [verifySignUp.checkDuplicateEmail], signup);

router.post("/signin", signin);

export default router;
