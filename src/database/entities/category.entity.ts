import {
  Column,
  Entity,
  JoinColumn,
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
  // Specify the name of the foreign key column in the 'category' table
  @JoinColumn({ name: "user_id" }) // "user_id" is the same name that field have in the Category table.
  user: User;

  // Establish a many-to-many relationship with the Note entity specifying the inverse side onDelete behavior
  @ManyToMany(() => Note, (note) => note.categories, {
    onDelete: "CASCADE",
  })
  notes: Note[];
}
