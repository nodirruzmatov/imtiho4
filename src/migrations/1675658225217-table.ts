import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675658225217 implements MigrationInterface {
    name = 'table1675658225217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subcategories" ("subcategories_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subcategory_name" character varying(32) NOT NULL, "categoriesId" uuid, CONSTRAINT "PK_d73b75bb605f53081b746b0385b" PRIMARY KEY ("subcategories_id"))`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("category") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8"`);
        await queryRunner.query(`DROP TABLE "subcategories"`);
    }

}
