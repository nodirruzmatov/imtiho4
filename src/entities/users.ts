import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comments } from "./comments";
import { Orders } from "./order";
import { Score } from "./score";
@Entity({
  name: "users",
})
export class Users {
  @PrimaryGeneratedColumn("uuid", {
    name: "user_id",
  })
  id: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: "user_name",
  })
  name: string;

  @Column({
    type: "varchar",
    length: 128,
    nullable: false,
    name: "user_email",
  })
  email: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: "user_password",
  })
  password: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: "user_tel",
  })
  tel: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: "user_role",
  })
  role: string;

  @OneToMany(() => Comments, (comments) => comments.user)
  comment: Comments[];

  @OneToMany(() => Score, (score) => score.users)
  score: Score[];

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];
}
