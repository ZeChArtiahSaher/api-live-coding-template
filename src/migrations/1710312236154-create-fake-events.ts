import { faker } from '@faker-js/faker';

import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class CreateFakeEvents1710312236154
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    let insertQuery = ''

    for (let i = 0; i < 50000; i++) {
      const userId = faker.helpers.arrayElement([1, 2, 3, 4, 5])
      const type = faker.helpers.arrayElement(['page-view', 'button-click', 'link-click']);
      const page = faker.helpers.arrayElement(['home', 'contests', 'contest-detail', 'profile']);
      const platform = faker.helpers.arrayElement(['web', 'ios', 'android']);
      const createdAt = faker.date.between({ from: faker.date.recent({ days: 30, refDate: new Date() }), to: new Date() });

      insertQuery += `
        INSERT INTO events (user_id, type, page, platform, created_at)
        VALUES ('${userId}', '${type}', '${page}', '${platform}', '${createdAt.toISOString()}');
    `;

      if (i % 10000 === 0) {
        await queryRunner.query(insertQuery)
        insertQuery = ''
      }
    }

    if (insertQuery) {
      await queryRunner.query(insertQuery)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await await queryRunner.query('DELETE FROM events')
  }
}
