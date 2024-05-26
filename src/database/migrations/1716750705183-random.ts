import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716750705183 implements MigrationInterface {
    name = 'Random1716750705183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" ADD "bookId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" DROP COLUMN "bookId"`);
    }

}
