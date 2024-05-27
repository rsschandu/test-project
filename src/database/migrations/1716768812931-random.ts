import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716768812931 implements MigrationInterface {
    name = 'Random1716768812931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "currentLendingHistoryId"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "currentLendingHistoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "UQ_3405097cf80a5a294cc02cc02fa" UNIQUE ("currentLendingHistoryId")`);
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b"`);
        await queryRunner.query(`ALTER TABLE "lending_history" ALTER COLUMN "customerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lending_history" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD "bookId" uuid`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b" UNIQUE ("lendDate", "bookId", "customerId")`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_3405097cf80a5a294cc02cc02fa" FOREIGN KEY ("currentLendingHistoryId") REFERENCES "lending_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "FK_58e03e0867a838c13b7930e58b4" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "FK_58e03e0867a838c13b7930e58b4"`);
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_3405097cf80a5a294cc02cc02fa"`);
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b"`);
        await queryRunner.query(`ALTER TABLE "lending_history" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD "bookId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lending_history" ALTER COLUMN "customerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "UQ_961cf90c3180cf7436db938aa9b" UNIQUE ("lendDate", "customerId", "bookId")`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_3405097cf80a5a294cc02cc02fa"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "currentLendingHistoryId"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "currentLendingHistoryId" character varying`);
    }

}
