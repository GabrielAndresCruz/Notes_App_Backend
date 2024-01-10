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
      })
    );

    // Foreign Key for ManyToMany relationship with Category table.
    await queryRunner.createTable(
      new Table({
        name: "note_category",
        columns: [
          {
            name: "note_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "category_id",
            type: "int",
            isNullable: false,
          },
        ],
      })
    );

    // Foreign Keys for relationship table
    await queryRunner.createForeignKey(
      TABLE_NAMES.NOTE_CATEGORY,
      new TableForeignKey({
        columnNames: ["note_id"],
        referencedColumnNames: ["id"],
        referencedTableName: TABLE_NAMES.NOTE,
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      TABLE_NAMES.NOTE_CATEGORY,
      new TableForeignKey({
        columnNames: ["category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: TABLE_NAMES.CATEGORY,
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete foreign keys in reverse mode
    await queryRunner.dropForeignKey(TABLE_NAMES.NOTE, "FK_NOTE_USER");

    // Delete note_category relationship table
    await queryRunner.dropTable("note_category");

    // Delete Note table
    await queryRunner.dropTable(TABLE_NAMES.NOTE);
  }
}
