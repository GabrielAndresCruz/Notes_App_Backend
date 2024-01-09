import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";
import { User } from "./user.entity";
import { Category } from "./category.entity";

@Entity(TABLE_NAMES.NOTE)
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: "CASCADE" })
  user: User;

  @ManyToMany(() => Category, (category) => category.notes, {
    onDelete: "CASCADE",
  })
  categories: Category[];
}
