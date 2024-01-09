import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";
import { Note } from "./note.entity";
import { Category } from "./category.entity";

@Entity(TABLE_NAMES.USER)
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.user, { onDelete: "CASCADE" })
  notes: Note[];

  @OneToMany(() => Category, (category) => category.user, {
    onDelete: "CASCADE",
  })
  categories: Category[];
}
