import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products";
import { Users } from "./users";
@Entity({
  name: "comments",
})
export class Comments {
  @PrimaryGeneratedColumn("uuid", {
    name: "comment_id",
  })
  id: string;

  @Column({
    type: "text",
    nullable: false,
    name: "comment_text",
  })
  text: string;

  @ManyToOne(() => Products, (products) => products.comment)
  product: Products;

  @ManyToOne(() => Users, (users) => users.comment)
  user: Users;
}
