import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716749617726 implements MigrationInterface {
    name = 'Random1716749617726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "book_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "book_id" character varying NOT NULL`);
    }

}
