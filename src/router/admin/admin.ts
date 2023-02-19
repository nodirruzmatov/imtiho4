import { Router } from "express";
import { validationHandler } from "../../middleware/validationHandler";
import { JOI } from "../../validation/validation";
import admin from "../../controller/admin/admin";
import { verifyToken } from "../../middleware/verifyToken";
import { verifyRole } from "../../middleware/verifyRole";

const Adminrouter = Router();

export default Adminrouter.use(verifyToken)
  .use(verifyRole("admin"))
  // ! categories-------------------------------------
  .get("/categories", admin.GetCategories)
  .post(
    "/NewCategories",
    validationHandler(JOI.addCategories),
    admin.NewCategory
  )
  .patch(
    "/updateCategories/:id",
    validationHandler(JOI.addCategories),
    admin.PutCategories
  )
  .delete("/delCategories/:id", admin.DelCategories)
  // ! subcategories----------------------------------------------
  .get("/subCategories", admin.GetSubcategories)
  .post(
    "/newSubCategories",
    validationHandler(JOI.addSubCategories),
    admin.NewSubCategories
  )
  .patch(
    "/updateSubcategories/:id",
    validationHandler(JOI.addSubCategories),
    admin.PutSubcategories
  )
  .delete("/delSubCategories/:id", admin.DelSubCategories)
  // ! subsub ----------------------------------------
  .get("/subsub", admin.GetSubsub)
  .post("/newSubsub", validationHandler(JOI.addSubCategories), admin.NewSubsub)
  .patch(
    "/updateSubsub/:id",
    validationHandler(JOI.addSubCategories),
    admin.PutSubsub
  )
  .delete("/delSubsub/:id", admin.DelSubsub)
  // ! subsub ----------------------------------------------
  .get("/products", admin.GetProducts)
  .post("/newProducts", validationHandler(JOI.products), admin.newProducts)
  .delete("/delProducts/:id", admin.DelProducts)
  .patch(
    "/updateProducts/:id",
    validationHandler(JOI.discount),
    admin.PutProducts
  );

// .post("/product", admin.Test4);
