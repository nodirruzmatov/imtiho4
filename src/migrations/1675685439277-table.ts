import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675685439277 implements MigrationInterface {
    name = 'table1675685439277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("products_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_name" character varying(32) NOT NULL, "product_cost" character varying(32) NOT NULL, "product_discount" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_score" integer NOT NULL, "subsubId" uuid, CONSTRAINT "PK_05ee71b1ce56d64216ea4b2955e" PRIMARY KEY ("products_id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_bb1b145296700d5e750cec65d8d" FOREIGN KEY ("subsubId") REFERENCES "subsub"("subsub_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_bb1b145296700d5e750cec65d8d"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
