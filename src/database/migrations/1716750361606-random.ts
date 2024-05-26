import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716750361606 implements MigrationInterface {
    name = 'Random1716750361606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_287fd4ab240affcd35134d5df0e"`);
        await queryRunner.query(`CREATE TABLE "lending_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lendDate" TIMESTAMP NOT NULL, "daysToReturn" integer, "customerId" integer, CONSTRAINT "PK_a40f41c63f659ad9b400364f9d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "lendDate"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "daysToReturn"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "book" ADD "daysToReturn" integer`);
        await queryRunner.query(`ALTER TABLE "book" ADD "lendDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP TABLE "lending_history"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_287fd4ab240affcd35134d5df0e" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
