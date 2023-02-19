import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675660907077 implements MigrationInterface {
    name = 'table1675660907077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "category" TO "category_id"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME CONSTRAINT "PK_bcd0361927be4baf8a1f401590e" TO "PK_51615bef2cea22812d0dcab6e18"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" TO "PK_bcd0361927be4baf8a1f401590e"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "category_id" TO "category"`);
    }

}
