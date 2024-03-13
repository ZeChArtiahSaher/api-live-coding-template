import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class CreateTableEvents1708282905473
  implements MigrationInterface {
  tableName = 'events';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id', 
            type: 'int', 
            isPrimary: true, 
            isGenerated: true, 
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'page',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'platform',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true);
  }
}
