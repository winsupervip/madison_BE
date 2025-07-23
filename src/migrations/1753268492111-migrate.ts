import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1753268492111 implements MigrationInterface {
  name = 'Migrate1753268492111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "User"
            ADD "username" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "Manager"
            ADD "username" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "email" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "Manager"
            ALTER COLUMN "email" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Manager"
            ALTER COLUMN "email"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "User"
            ALTER COLUMN "email"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "Manager" DROP COLUMN "username"
        `);
    await queryRunner.query(`
            ALTER TABLE "User" DROP COLUMN "username"
        `);
  }
}
