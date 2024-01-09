import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";

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
}
