import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716752621768 implements MigrationInterface {
    name = 'Random1716752621768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b" UNIQUE ("lendDate", "bookId", "customerId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b"`);
    }

}
