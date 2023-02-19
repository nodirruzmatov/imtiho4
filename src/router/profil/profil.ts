import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { validationHandler } from "../../middleware/validationHandler";
import { verifyRole } from "../../middleware/verifyRole";
import ProfilController from "../../controller/profil/profil";
import { JOI } from "../../validation/validation";
const Profilrouter = Router();

export default Profilrouter.use(verifyToken)
  .use(verifyRole("user"))
  .get("/orders", ProfilController.MyOrders)
  .get("/comments", ProfilController.MyComments)
  .patch("/update", validationHandler(JOI.update), ProfilController.Update)
  .delete("/delete/:id", ProfilController.DelComments)
  .delete("/delOrders/:id", ProfilController.DelOrders);
