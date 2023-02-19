import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675655614962 implements MigrationInterface {
    name = 'table1675655614962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("category" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_name" character varying(32) NOT NULL, CONSTRAINT "PK_bcd0361927be4baf8a1f401590e" PRIMARY KEY ("category"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
