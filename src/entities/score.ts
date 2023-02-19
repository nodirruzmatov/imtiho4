import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products";
import { Users } from "./users";

@Entity({
  name: "score",
})
export class Score {
  @PrimaryGeneratedColumn("uuid", {
    name: "score_id",
  })
  id: string;

  @Column({
    type: "int",
    name: "score_ball",
  })
  ball: number;

  @ManyToOne(() => Users, (users) => users.score)
  users: Users;

  @ManyToOne(() => Products, (products) => products.ball)
  products: Products;
}
