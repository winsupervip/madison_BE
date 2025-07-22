import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1753186579115 implements MigrationInterface {
  name = 'Migrate1753186579115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "ManagerNotification" (
                "id" SERIAL NOT NULL,
                "managerId" integer NOT NULL,
                "title" text NOT NULL,
                "description" text NOT NULL,
                "createDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updateDate" TIMESTAMP NOT NULL DEFAULT now(),
                "attachment_url" character varying(255),
                "userId" integer NOT NULL,
                CONSTRAINT "PK_2b0b80ff38edc6b80a6be6dc9b1" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "ManagerNotification"
            ADD CONSTRAINT "FK_f907dbdd2499d1dafe395e631c2" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "ManagerNotification"
            ADD CONSTRAINT "FK_6e72cfdcb03848d0a1a3a9d55d3" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "ManagerNotification" DROP CONSTRAINT "FK_6e72cfdcb03848d0a1a3a9d55d3"
        `);
    await queryRunner.query(`
            ALTER TABLE "ManagerNotification" DROP CONSTRAINT "FK_f907dbdd2499d1dafe395e631c2"
        `);
    await queryRunner.query(`
            DROP TABLE "ManagerNotification"
        `);
  }
}
