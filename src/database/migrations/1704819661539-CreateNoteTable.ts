import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";

export class CreateNoteTable1704819661539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAMES.NOTE,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "content",
            type: "text",
            length: "500",
            isNullable: false,
          },
          {
            name: "archived",
            type: "boolean",
            default: false,
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
        ],
      })
    );

    // Foreign Key for ManyToOne relationship with User table.
    await queryRunner.createForeignKey(
      TABLE_NAMES.NOTE,
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: TABLE_NAMES.USER,
        onDelete: "CASCADE",
        name: "FK_NOTE_USER",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete foreign keys in reverse mode
    await queryRunner.dropForeignKey(TABLE_NAMES.NOTE, "FK_NOTE_USER");

    // Delete Note table
    await queryRunner.dropTable(TABLE_NAMES.NOTE);
  }
}
