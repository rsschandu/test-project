import { MigrationInterface, QueryRunner } from "typeorm";

export class Random1716754434839 implements MigrationInterface {
    name = 'Random1716754434839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" DROP CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lending_history" ADD CONSTRAINT "FK_3e4b9da068a0716eb8383a36fc7" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
