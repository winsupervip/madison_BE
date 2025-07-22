import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1753178240584 implements MigrationInterface {
  name = 'Migrate1753178240584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Complains"
            ALTER COLUMN "status"
            SET DEFAULT 'Pending'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Complains"
            ALTER COLUMN "status" DROP DEFAULT
        `);
  }
}
