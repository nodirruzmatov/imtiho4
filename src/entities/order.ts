import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products";
import { Users } from "./users";

@Entity({
  name: "orders",
})
export class Orders {
  @PrimaryGeneratedColumn("uuid", {
    name: "order_id",
  })
  id: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createAt: string;

  @ManyToOne(() => Users, (users) => users.orders)
  user: Users;
  @ManyToOne(() => Products, (products) => products.orders)
  product: Products;
}
