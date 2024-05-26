import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716760871492 implements MigrationInterface {
    name = 'Random1716760871492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" ADD "returnDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD "rental_charge" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" DROP COLUMN "rental_charge"`);
        await queryRunner.query(`ALTER TABLE "lending_history" DROP COLUMN "returnDate"`);
    }

}
