import { NextFunction, Request, Response } from "express";
import dataSource from "../../config/orm";
import { redis } from "../../config/redis";
import { Users } from "../../entities/users";
import { Exception } from "../../exception/exception";
import { sing } from "../../utils/jwt";

class login {
  public async Login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { tel, password } = req.body;

    const allUsers = await dataSource
      .getRepository(Users)
      .find()
      .catch((err) => next(new Exception(err.message, 504)));
    const fountUser = allUsers?.find(
      (e) => e.tel == tel && e.password == password
    );

    if (!fountUser) {
      return next(new Exception("User not found", 404));
    }

    res.json({
      message: "Success",
      access_token: sing({ id: fountUser.id }),
    });
  }

  public async Register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, password, tel, email } = req.body;

    const allUsers = await dataSource
      .getRepository(Users)
      .find()
      .catch((err) => next(new Exception(err.message, 504)));

    const foundUser = allUsers?.find((e) => e.tel == tel);

    if (foundUser) {
      return next(new Exception("You already registered", 404));
    }

    const newUser = await dataSource
      .getRepository(Users)
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({ name, email, password, tel, role: "users" })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));

    res.json({
      message: "Success",
      access_token: sing({ id: newUser?.identifiers[0]?.id }),
    });
  }
}

export default new login();
