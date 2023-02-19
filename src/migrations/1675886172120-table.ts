import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675886172120 implements MigrationInterface {
    name = 'table1675886172120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "order_name" TO "order_id"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME CONSTRAINT "PK_35dc0cff7cb2fb50eb6c3567ce8" TO "PK_cad55b3cb25b38be94d2ce831db"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" TO "PK_35dc0cff7cb2fb50eb6c3567ce8"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "order_id" TO "order_name"`);
    }

}
