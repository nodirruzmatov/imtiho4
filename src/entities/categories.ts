import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategories } from "./subcategories";

@Entity({
  name: "categories",
})
export class Categories {
  @PrimaryGeneratedColumn("uuid", {
    name: "category_id",
  })
  id: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: "category_name",
  })
  name: string;

  @OneToMany(() => Subcategories, (subcategories) => subcategories.categories)
  subcategories: Subcategories[];
}
