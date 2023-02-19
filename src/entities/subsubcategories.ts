import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategories } from "./subcategories";
import { Products } from "./products";
@Entity({
  name: "subsub",
})
export class Subsub {
  @PrimaryGeneratedColumn("uuid", {
    name: "subsub_id",
  })
  id: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: "subsub_name",
  })
  name: string;

  @ManyToOne(() => Subcategories, (subcategories) => subcategories.subsub)
  subcategory: Subcategories;

  @OneToMany(()=>Products, products=>products.subsub)
  products:Products[]
}
