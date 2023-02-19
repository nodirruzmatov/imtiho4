import { Router } from "express";
import login from "../../controller/login/login";
import { validationHandler } from "../../middleware/validationHandler";
import { JOI } from "../../validation/validation";
// import admin from "../../controller/admin/admin";
const Loginrouter = Router();

export default Loginrouter.post(
  "/login",
  validationHandler(JOI.login),
  login.Login
).post("/register", validationHandler(JOI.register), login.Register);
// .post("/admin", admin.Test)
// .post("/admin3", admin.Test3)
// .get("/get", admin.Test2)
// .post("/product", admin.Test4);
