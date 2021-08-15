const controller = require("../controllers/email");

module.exports = function(app) {
  app.post(
    "/api/reset_password/:email",
    controller.sendPasswordResetEmail
  );

  app.post("/api/receive_new_password/:userId/:token", controller.receiveNewPassword);
};
