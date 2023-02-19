import { Router } from "express";
import UsersController from "../../controller/users/users";
import { verifyRole } from "../../middleware/verifyRole";
import { verifyToken } from "../../middleware/verifyToken";
import { validationHandler } from "../../middleware/validationHandler";
import { JOI } from "../../validation/validation";

const Usersrouter = Router();

export default Usersrouter.use(verifyToken)
  .use(verifyRole("user"))
  .get("/new", UsersController.GetNew)
  .get("/big", UsersController.Big)
  .get("/categories", UsersController.Categories)
  .get("/get/:id", UsersController.GetProducts)
  .get("/one/:id", UsersController.OneProduct)
  .post(
    "/comment/:id",
    validationHandler(JOI.comment),
    UsersController.AddCommen
  )
  .post("/score/:id", validationHandler(JOI.score), UsersController.GiveScore)
  .post("/order/:id", UsersController.Orders);
