import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";

@Entity(TABLE_NAMES.NOTE)
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}
