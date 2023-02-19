import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675667043811 implements MigrationInterface {
    name = 'table1675667043811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subsub" ("subsub_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subsub_name" character varying(32) NOT NULL, "subcategoryId" uuid, CONSTRAINT "PK_262274b6878d9783ffcd68b15d8" PRIMARY KEY ("subsub_id"))`);
        await queryRunner.query(`ALTER TABLE "subsub" ADD CONSTRAINT "FK_c29b75bcab7fc79e6fc08237ad5" FOREIGN KEY ("subcategoryId") REFERENCES "subcategories"("subcategory_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsub" DROP CONSTRAINT "FK_c29b75bcab7fc79e6fc08237ad5"`);
        await queryRunner.query(`DROP TABLE "subsub"`);
    }

}
