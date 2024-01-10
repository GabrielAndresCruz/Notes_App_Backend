import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";

export class CreateUserTable1704807472237 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAMES.USER,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "username",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "60",
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );

    // Adding Foreign Keys
    await queryRunner.createForeignKey(
      TABLE_NAMES.USER,
      new TableForeignKey({
        columnNames: ["id"], // Column in User Table
        referencedColumnNames: ["user_id"], // Column in the relationship table
        referencedTableName: TABLE_NAMES.USER, // Name of relationship table
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      TABLE_NAMES.USER,
      new TableForeignKey({
        columnNames: ["id"],
        referencedColumnNames: ["user_id"],
        referencedTableName: TABLE_NAMES.CATEGORY,
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete foreign keys in reverse mode
    await queryRunner.dropForeignKey(TABLE_NAMES.USER, "FK_NOTE_USER");
    await queryRunner.dropForeignKey(TABLE_NAMES.USER, "FK_CATEGORY_USER");

    // Delete table
    await queryRunner.dropTable(TABLE_NAMES.USER);
  }
}
