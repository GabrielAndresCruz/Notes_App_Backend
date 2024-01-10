import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";

export class CreateNoteCategoryTable1704819744887
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the note_category table for the ManyToMany relationship with Note
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
    // Delete note_category relationship table
    await queryRunner.dropTable("note_category");
  }
}
