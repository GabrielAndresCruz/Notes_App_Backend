import {
  Column,
  Entity,
  JoinTable,
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

  @Column()
  archived: boolean;

  // Establish a many-to-one relationship with the User entity, specifying the inverse side and onDelete behavior
  @ManyToOne(() => User, (user) => user.notes, { onDelete: "CASCADE" })
  user: User;

  // Establish a many-to-many relationship with the Category entity specifying the inverse side onDelete behavior
  @ManyToMany(() => Category, (category) => category.notes, {
    onDelete: "CASCADE",
  })
  // Define the details of the many-to-many relationship table
  @JoinTable({ name: "note_category" })
  categories: Category[];
}
