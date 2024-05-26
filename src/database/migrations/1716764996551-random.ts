import { MigrationInterface, QueryRunner } from 'typeorm';

export class Random1716764996551 implements MigrationInterface {
  name = 'Random1716764996551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pricing_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(5,2) NOT NULL DEFAULT '0', "bookType" character varying NOT NULL, CONSTRAINT "PK_9b14a02a4e47f422788b3a56c3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."book_booktype_enum" AS ENUM('Regular', 'Fiction', 'Novel')`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD "bookType" "public"."book_booktype_enum" NOT NULL DEFAULT 'Regular'`,
    );
    await queryRunner.query(
      `INSERT INTO "pricing_table" ("price", "bookType") VALUES (1.50, 'Regular')`,
    );
    await queryRunner.query(
      `INSERT INTO "pricing_table" ("price", "bookType") VALUES (3.00, 'Fiction')`,
    );
    await queryRunner.query(
      `INSERT INTO "pricing_table" ("price", "bookType") VALUES (5.00, 'Novel')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "bookType"`);
    await queryRunner.query(`DROP TYPE "public"."book_booktype_enum"`);
    await queryRunner.query(`DROP TABLE "pricing_table"`);
  }
}
