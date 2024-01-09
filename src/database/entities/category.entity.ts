import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";
import { User } from "./user.entity";
import { Note } from "./note.entity";

@Entity(TABLE_NAMES.CATEGORY)
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.categories, { onDelete: "CASCADE" })
  user: User;

  @ManyToMany(() => Note, (note) => note.categories, {
    onDelete: "CASCADE",
  })
  notes: Note[];
}
