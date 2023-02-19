import { NextFunction, Request, Response } from "express";
import { Users } from "../../entities/users";
import dataSource from "../../config/orm";
import { Exception } from "../../exception/exception";
import { redis } from "../../config/redis";
import { Comments } from "../../entities/comments";
import { Orders } from "../../entities/order";

interface IDecode {
  role: string;
  id: string;
}

interface RequestWithUserRole extends Request {
  userId?: IDecode;
  userRole?: IDecode;
}

class ProfilController {
  // ! get with orders ------------------------------
  public async MyOrders(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const uId = req?.userId;
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );

    const cUsers = await cashe?.get("Users");

    if (!cUsers) {
      const one = await dataSource
        .getRepository(Users)
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.orders", "orders")
        .where("users.user_id = :id", { id: uId })
        .getOne()
        .catch((err) => next(new Exception(err.message, 504)));

      await cashe?.setEx("Users", 15, JSON.stringify(one));
      res.json(one);
      return;
    }

    res.json(JSON.parse(String(cUsers)));
  }

  // ! get with comments ------------------------------
  public async MyComments(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const uId = req?.userId;
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );

    const cUsers = await cashe?.get("Comments");

    if (!cUsers) {
      const one = await dataSource
        .getRepository(Users)
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.comment", "comment")
        .where("users.user_id = :id", { id: uId })
        .getOne()
        .catch((err) => next(new Exception(err.message, 504)));

      await cashe?.setEx("Comments", 15, JSON.stringify(one));
      res.json(one);
      return;
    }

    res.json(JSON.parse(String(cUsers)));
  }

  public async DelComments(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const uId = req?.userId;

    const one = await dataSource
      .getRepository(Users)
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.comment", "comment")
      .where("users.user_id = :id", { id: uId })
      .getOne()
      .catch((err) => next(new Exception(err.message, 504)));

    const found = one?.comment?.find((e) => e.id == id);

    if (!found) {
      return next(new Exception("not found", 400));
    }

    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Comments)
      .where("comment_id = :id", { id: id })
      .returning("*")
      .execute();

    res.json(del);
  }

  public async DelOrders(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const uId = req?.userId;

    const one = await dataSource
      .getRepository(Users)
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.orders", "orders")
      .where("users.user_id = :id", { id: uId })
      .getOne()
      .catch((err) => next(new Exception(err.message, 504)));

    const found = one?.orders?.find((e) => e.id == id);

    if (!found) {
      return next(new Exception("not found", 400));
    }

    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Orders)
      .where("order_id = :id", { id: id })
      .returning("*")
      .execute();

    res.json(del);
  }

  // ! update -------------------------------
  public async Update(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const uId = req?.userId;
    const { name, password, tel, email } = req.body;

    const one = await dataSource
      .createQueryBuilder()
      .update(Users)
      .set({ name, email, password, tel })
      .where("user_id = :id", { id: uId })
      .returning("*")
      .execute();

    res.json({
      message: "Success",
      data: one,
    });
  }
}

export default new ProfilController();
