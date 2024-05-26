import { MigrationInterface, QueryRunner } from 'typeorm';

export class Random1716765980503 implements MigrationInterface {
  name = 'Random1716765980503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pricing_table" ADD "minimumCharge" numeric(5,2) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing_table" ADD "minimumDays" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing_table" ADD "additionalCharge" numeric(5,2) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `UPDATE "pricing_table" SET "price" = 1.0, "minimumCharge" = 2, "minimumDays" = 2, "additionalCharge" = 0.5 WHERE "bookType" = 'Regular'`,
    );
    await queryRunner.query(
      `UPDATE "pricing_table" SET "minimumCharge" = 4.5, "minimumDays" = 3 WHERE "bookType" = 'Novel'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pricing_table" DROP COLUMN "additionalCharge"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing_table" DROP COLUMN "minimumDays"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing_table" DROP COLUMN "minimumCharge"`,
    );
  }
}
