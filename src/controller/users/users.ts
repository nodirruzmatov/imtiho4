import { NextFunction, Request, Response } from "express";
import { any, string } from "joi";
import dataSource from "../../config/orm";
import { redis } from "../../config/redis";
import { Comments } from "../../entities/comments";
import { Products } from "../../entities/products";
import { Score } from "../../entities/score";
import { Users } from "../../entities/users";
import { Exception } from "../../exception/exception";
import { Orders } from "../../entities/order";
import { Categories } from "../../entities/categories";
import { Subcategories } from "../../entities/subcategories";
import { Subsub } from "../../entities/subsubcategories";

interface IDecode {
  role: string;
  id: string;
}

interface RequestWithUserRole extends Request {
  userId?: IDecode;
  userRole?: IDecode;
}

class UsersController {
  // ! get products via category ------------------
  public async GetProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );

    const cProducts = await cashe?.get("Products");

    if (!cProducts) {
      const prosubsubducts = await dataSource
        .getRepository(Subsub)
        .createQueryBuilder("subsub")
        .leftJoinAndSelect("subsub.products", "products")
        .where("subsub.subsub_id =:id", { id: id })
        .getMany()
        .catch((err) => next(new Exception(err.message, 504)));

      await cashe?.setEx("Products", 15, JSON.stringify(prosubsubducts));

      res.json(prosubsubducts);
      return;
    }

    res.json(JSON.parse(String(cProducts)));
  }

  // ! get categories ----------------------
  public async Categories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );

    const cCategories = await cashe?.get("Categories");
    const cSubategories = await cashe?.get("Subategories");

    if (!cCategories) {
      const categories = await dataSource
        .getRepository(Categories)
        .createQueryBuilder("Categories")
        .leftJoinAndSelect("Categories.subcategories", "subcategories")
        .getMany()
        .catch((err) => next(new Exception(err.message, 504)));
      await cashe?.setEx("Categories", 15, JSON.stringify(categories));

      const subcategories = await dataSource
        .getRepository(Subcategories)
        .createQueryBuilder("Subcategories")
        .leftJoinAndSelect("Subcategories.subsub", "subsub")
        .getMany()
        .catch((err) => next(new Exception(err.message, 504)));
      await cashe?.setEx("Subategories", 15, JSON.stringify(subcategories));

      res.json({
        Categories: categories,
        Subcategories: subcategories,
      });
      return;
    }
    res.json({
      Categories: JSON.parse(String(cCategories)),
      Subcategories: JSON.parse(String(cSubategories)),
    });
  }

  // ! get new products -------------------------------
  public async GetNew(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );
    const cProducts = await cashe?.get("newProducts");

    if (!cProducts) {
      const allUsers = await dataSource
        .getRepository(Products)
        .createQueryBuilder("Products")
        .leftJoinAndSelect("Products.ball", "ball")
        .orderBy("Products.createdAt", "DESC")
        .getMany()
        .catch((err) => next(new Exception(err.message, 504)));

      await cashe
        ?.setEx("newProducts", 5, JSON.stringify(allUsers))
        .catch((err) => next(new Exception(err.message, 504)));

      res.json(allUsers);
      return;
    }

    res.json(JSON.parse(String(cProducts)));
  }

  // ! get big discount --------------------------------
  public async Big(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );
    const cProducts = await cashe?.get("bigProducts");

    if (!cProducts) {
      const allUsers = await dataSource
        .getRepository(Products)
        .createQueryBuilder("Products")
        .leftJoinAndSelect("Products.ball", "ball")
        .orderBy("Products.discount", "DESC")
        .getMany()
        .catch((err) => next(new Exception(err.message, 504)));

      await cashe
        ?.setEx(
          "bigProducts",
          15,
          JSON.stringify(allUsers?.filter((e) => e.discount))
        )
        .catch((err) => next(new Exception(err.message, 504)));

      res.json(allUsers?.filter((e) => e.discount));
      return;
    }

    res.json(JSON.parse(String(cProducts)));
  }

  // ! get one product -----------------------------------------
  public async OneProduct(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    var ball = 0;
    const one = await dataSource
      .getRepository(Products)
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.comment", "comment")
      .leftJoinAndSelect("products.ball", "ball")
      .where("products.products_id = :name", { name: id })
      .getOne()
      .catch((err) => next(new Exception(err.message, 504)));

    one?.ball.map((e) => (ball = e.ball + ball));
    ball = ball / Number(one?.ball?.length);

    res.json(one);
  }

  // !add comment ----------------------------------------
  public async AddCommen(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { text } = req.body;
    const id = req.params;
    const uId = req?.userId;

    const add = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Comments)
      .values({ text, product: id, user: uId })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));

    res.send(add);
  }

  // ! give score ------------------------------------
  public async GiveScore(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { score } = req.body;
    const id = req.params;
    const uId = req?.userId;

    const add = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Score)
      .values({ ball: score, products: id, users: uId })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.send(add);
  }

  // ! order ------------------------------
  public async Orders(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = req.params;
    const uId = req?.userId;

    const add = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Orders)
      .values({ product: id, user: uId })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.send(add);
  }
}

export default new UsersController();
