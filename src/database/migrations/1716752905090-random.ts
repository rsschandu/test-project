import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716752905090 implements MigrationInterface {
    name = 'Random1716752905090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7"`);
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b"`);
        await queryRunner.query(`ALTER TABLE "lending_history" ALTER COLUMN "daysToReturn" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lending_history" ALTER COLUMN "customerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b" UNIQUE ("lendDate", "bookId", "customerId")`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7"`);
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b"`);
        await queryRunner.query(`ALTER TABLE "lending_history" ALTER COLUMN "customerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lending_history" ALTER COLUMN "daysToReturn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b" UNIQUE ("lendDate", "customerId", "bookId")`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
