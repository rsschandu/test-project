import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716757202663 implements MigrationInterface {
    name = 'Random1716757202663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "currentLendingHistoryId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "currentLendingHistoryId"`);
    }

}
