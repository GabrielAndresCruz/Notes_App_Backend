import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { TABLE_NAMES } from "../../constants/dbTables";

export class CreateCategoryTable1704819675817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAMES.CATEGORY,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
        ],
      })
    );

    // Add foreign key for ManyToOne relationship with User
    await queryRunner.createForeignKey(
      TABLE_NAMES.CATEGORY,
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: TABLE_NAMES.USER,
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign keys and tables created in the up method
    await queryRunner.dropForeignKey(TABLE_NAMES.CATEGORY, "FK_CATEGORY_USER");
    await queryRunner.dropTable(TABLE_NAMES.CATEGORY);
  }
}
