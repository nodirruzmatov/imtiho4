import { Router } from "express";
import Usersrouter from "./user/user";
import Loginrouter from "./login/login";
import Profilrouter from "./profil/profil";
import Adminrouter from "./admin/admin";

const router = Router();

export default router
  .use("/admin", Adminrouter)
  .use("/login", Loginrouter)
  .use("/users", Usersrouter)
  .use("/profil", Profilrouter);
