import { NextFunction, Request, Response } from "express";
import dataSource from "../../config/orm";
import { Subcategories } from "../../entities/subcategories";
import { Categories } from "../../entities/categories";
import { Exception } from "../../exception/exception";
import { Subsub } from "../../entities/subsubcategories";
import { Products } from "../../entities/products";
import { redis } from "../../config/redis";

interface IDecode {
  role: string;
  id: string;
}

interface RequestWithUserRole extends Request {
  userId?: IDecode;
  userRole?: IDecode;
}

class admin {
  // ! categories -------------------------------
  public async GetCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );
    const cCatrgories = await cashe?.get("Categories");

    if (!cCatrgories) {
      const get = await dataSource
        .getRepository(Categories)
        .createQueryBuilder("Categories")
        .leftJoinAndSelect("Categories.subcategories", "subcategories")
        .getMany()
        .catch((err) => next(new Exception(err.message, 504)));

      await cashe
        ?.setEx("Categories", 15, JSON.stringify(get))
        .catch((err) => next(new Exception(err.message, 504)));

      res.json(get);
      return;
    }

    res.json(JSON.parse(cCatrgories));
  }

  public async NewCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name } = req.body;

    const newCategory = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Categories)
      .values({ name })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.json(newCategory);
    return;
  }

  public async PutCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name } = req.body;
    const { id } = req.params;

    const update = await dataSource
      .createQueryBuilder()
      .update(Categories)
      .set({ name: name })
      .where("category_id= :id", { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.json(update);
  }

  public async DelCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Categories)
      .where("category_id = :id", { id: id })
      .returning("*")
      .execute();

    res.json(del);
  }
  // ! SubCategories -----------------------------------------

  public async GetSubcategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );

    const cSubategories = await cashe?.get("Subategories");

    if (!cSubategories) {
      const subcategories = await dataSource
        .getRepository(Subcategories)
        .createQueryBuilder("Subcategories")
        .leftJoinAndSelect("Subcategories.subsub", "subsub")
        .getMany()
        .catch((err) => next(new Exception(err.message, 504)));
      await cashe?.setEx("Subategories", 15, JSON.stringify(subcategories));

      res.json(subcategories);
      return;
    }
    res.json(JSON.parse(String(cSubategories)));
  }

  public async NewSubCategories(
    req: RequestWithUserRole,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, id } = req.body;

    const newSubcategories = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Subcategories)
      .values({ name, categories: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.json(newSubcategories);
  }

  public async PutSubcategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, cid } = req.body;
    const { id } = req.params;

    const update = await dataSource
      .createQueryBuilder()
      .update(Subcategories)
      .set({ name: name, categories: cid })
      .where("subcategory_id= :id", { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.json(update);
  }

  public async DelSubCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Subcategories)
      .where("subcategory_id = :id", { id: id })
      .returning("*")
      .execute();

    res.json(del);
  }

  // ! sub subcategories ------------------------------------------------------

  public async GetSubsub(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );

    const cSubsub = await cashe?.get("Subsub");

    if (!cSubsub) {
      const subsub = await dataSource
        .getRepository(Subsub)
        .createQueryBuilder("Subsub")
        .leftJoinAndSelect("Subsub.products", "products")
        .getMany()
        .catch((err) => next(new Exception(err.message, 504)));
      await cashe?.setEx("Subsub", 15, JSON.stringify(subsub));

      res.json(subsub);
      return;
    }
    res.json(JSON.parse(String(cSubsub)));
  }

  public async NewSubsub(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, id } = req.body;

    const newSubsub = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Subsub)
      .values({ name, subcategory: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.json(newSubsub);
  }

  public async PutSubsub(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, cid } = req.body;
    const { id } = req.params;

    const update = await dataSource
      .createQueryBuilder()
      .update(Subsub)
      .set({ name: name, subcategory: cid })
      .where("subsub_id= :id", { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.json(update);
  }

  public async DelSubsub(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Subsub)
      .where("subsub_id = :id", { id: id })
      .returning("*")
      .execute();
    res.json(del);
  }
  // ! Products ------------------------------------------

  public async GetProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cashe = await redis().catch((err) =>
      next(new Exception(err.message, 504))
    );
    const cProducts = await cashe?.get("Products");

    if (!cProducts) {
      const allUsers = await dataSource
        .getRepository(Products)
        .createQueryBuilder("Products")
        .leftJoinAndSelect("Products.ball", "ball")
        .leftJoinAndSelect("Products.comment", "comment")
        .getMany()
        .catch((err) => next(new Exception(err.message, 504)));

      await cashe
        ?.setEx("Products", 15, JSON.stringify(allUsers))
        .catch((err) => next(new Exception(err.message, 504)));

      res.json(allUsers);
      return;
    }

    res.json(JSON.parse(String(cProducts)));
  }

  public async newProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, cost, id } = req.body;

    const newUser = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values({ name, cost, subsub: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.json(newUser);
  }

  public async DelProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Products)
      .where("products_id = :id", { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));

    res.json(del);
  }

  // ! PUT for changeing discount -----------------------------------
  public async PutProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { discount } = req.body;
    const { id } = req.params;

    const update = await dataSource
      .createQueryBuilder()
      .update(Products)
      .set({ discount: discount })
      .where("products_id= :id", { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));
    res.json(update);
  }
}

export default new admin();
