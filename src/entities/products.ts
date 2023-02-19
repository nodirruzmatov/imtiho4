import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./categories";
import { Comments } from "./comments";
import { Orders } from "./order";
import { Score } from "./score";
import { Subsub } from "./subsubcategories";

@Entity({
  name: "products",
})
export class Products {
  @PrimaryGeneratedColumn("uuid", {
    name: "products_id",
  })
  id: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: "product_name",
  })
  name: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: "product_cost",
  })
  cost: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: true,
    name: "product_discount",
  })
  discount: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: string;

  @Column({
    type: "int",
    nullable: true,
    name: "product_score",
  })
  score: number;
  @OneToMany(() => Comments, (comments) => comments.product)
  comment: Comments[];

  @ManyToOne(() => Subsub, (subsub) => subsub.products)
  subsub: Subsub;

  @OneToMany(() => Score, (score) => score.products)
  ball: Score[];

  @OneToMany(()=>Orders,orders=>orders.product)
  orders:Orders[]
}
