import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate1753177132648 implements MigrationInterface {
  name = 'Migrate1753177132648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "User" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Manager" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "PK_aa85ff255e2dff1edcae191b64b" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Complains" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "title" text NOT NULL,
                "description" text NOT NULL,
                "status" character varying NOT NULL,
                "createDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updateDate" TIMESTAMP NOT NULL DEFAULT now(),
                "attachment_url" character varying(255),
                CONSTRAINT "PK_b5b37d8d02b0e9a4daff599716f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "ComplainsLog" (
                "id" SERIAL NOT NULL,
                "complainsId" integer NOT NULL,
                "managerId" integer NOT NULL,
                "note" character varying NOT NULL,
                CONSTRAINT "REL_8f7acd1d67e4168b9a8e2e6c41" UNIQUE ("complainsId"),
                CONSTRAINT "PK_33c143a36ede5b58ac99620a412" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "Complains"
            ADD CONSTRAINT "FK_1fbc2aab8ebd9b229694c1ce959" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "ComplainsLog"
            ADD CONSTRAINT "FK_8f7acd1d67e4168b9a8e2e6c412" FOREIGN KEY ("complainsId") REFERENCES "Complains"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "ComplainsLog"
            ADD CONSTRAINT "FK_c5da089cf15a99c5791e56c62e1" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "ComplainsLog" DROP CONSTRAINT "FK_c5da089cf15a99c5791e56c62e1"
        `);
    await queryRunner.query(`
            ALTER TABLE "ComplainsLog" DROP CONSTRAINT "FK_8f7acd1d67e4168b9a8e2e6c412"
        `);
    await queryRunner.query(`
            ALTER TABLE "Complains" DROP CONSTRAINT "FK_1fbc2aab8ebd9b229694c1ce959"
        `);
    await queryRunner.query(`
            DROP TABLE "ComplainsLog"
        `);
    await queryRunner.query(`
            DROP TABLE "Complains"
        `);
    await queryRunner.query(`
            DROP TABLE "Manager"
        `);
    await queryRunner.query(`
            DROP TABLE "User"
        `);
  }
}
