import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716759657455 implements MigrationInterface {
    name = 'Random1716759657455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sample" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_1e92238b098b5a4d13f6422cba7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "authorName" character varying NOT NULL, "bookName" character varying NOT NULL, "currentLendingHistoryId" character varying, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lending_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lendDate" TIMESTAMP NOT NULL, "daysToReturn" integer NOT NULL, "customerId" integer NOT NULL, "bookId" character varying NOT NULL, CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b" UNIQUE ("lendDate", "bookId", "customerId"), CONSTRAINT "PK_a40f41c63f659ad9b400364f9d6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lending_history"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "sample"`);
    }

}
