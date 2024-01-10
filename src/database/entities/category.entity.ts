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

  @Column({ type: "varchar", length: 30 })
  name: string;

  // Establish a many-to-one relationship with the User entity, specifying the inverse side and onDelete behavior
  @ManyToOne(() => User, (user) => user.categories, { onDelete: "CASCADE" })
  user: User;

  // Establish a many-to-many relationship with the Note entity specifying the inverse side onDelete behavior
  @ManyToMany(() => Note, (note) => note.categories, {
    onDelete: "CASCADE",
  })
  notes: Note[];
}
