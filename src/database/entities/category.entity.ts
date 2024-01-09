import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";

@Entity(TABLE_NAMES.CATEGORY)
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
