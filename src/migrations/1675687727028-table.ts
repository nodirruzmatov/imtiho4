import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675687727028 implements MigrationInterface {
    name = 'table1675687727028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_discount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_score" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_score" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_discount" SET NOT NULL`);
    }

}
