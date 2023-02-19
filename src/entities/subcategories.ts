import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./categories";
import { Subsub } from "./subsubcategories";

@Entity({
  name: "subcategories",
})
export class Subcategories {
  @PrimaryGeneratedColumn("uuid", {
    name: "subcategory_id",
  })
  id: string;

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: "subcategory_name",
  })
  name: string;

  @ManyToOne(() => Categories, (categories) => categories.subcategories)
  categories: Categories;

  @OneToMany(() => Subsub, (subsub) => subsub.subcategory)
  subsub: Subsub[];
}
