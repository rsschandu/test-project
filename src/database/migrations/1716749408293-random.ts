import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716749408293 implements MigrationInterface {
    name = 'Random1716749408293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "author_name"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "book_name"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "lend_date"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "days_to_return"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "authorName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "bookName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "lendDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "daysToReturn" integer`);
        await queryRunner.query(`ALTER TABLE "book" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_287fd4ab240affcd35134d5df0e" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_287fd4ab240affcd35134d5df0e"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "daysToReturn"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "lendDate"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "bookName"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "authorName"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "days_to_return" integer`);
        await queryRunner.query(`ALTER TABLE "book" ADD "lend_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "book_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "author_name" character varying NOT NULL`);
    }

}
