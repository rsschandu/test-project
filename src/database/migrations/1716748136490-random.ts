import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716748136490 implements MigrationInterface {
    name = 'Random1716748136490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`);
    }

}
