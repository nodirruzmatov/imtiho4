import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675752694628 implements MigrationInterface {
    name = 'table1675752694628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_score"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product_score" character varying(5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_score"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product_score" integer`);
    }

}
