import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";
import { Note } from "./note.entity";
import { Category } from "./category.entity";

@Entity(TABLE_NAMES.USER)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "30" })
  username: string;

  @Column({ type: "varchar", length: "60" })
  email: string;

  @Column()
  password: string;

  // Establish a one-to-many relationship with the Note entity, specifying the inverse side and onDelete behavior
  @OneToMany(() => Note, (note) => note.user, { onDelete: "CASCADE" })
  notes: Note[];

  // Establish a one-to-many relationship with the Category entity, specifying the inverse side and onDelete behavior
  @OneToMany(() => Category, (category) => category.user, {
    onDelete: "CASCADE",
  })
  categories: Category[];
}
