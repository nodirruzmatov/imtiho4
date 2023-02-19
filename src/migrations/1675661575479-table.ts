import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675661575479 implements MigrationInterface {
    name = 'table1675661575479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "PK_d73b75bb605f53081b746b0385b"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP COLUMN "subcategories_id"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD "subcategory_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "PK_4ee1ca1b5f9bde9c995002007f9" PRIMARY KEY ("subcategory_id")`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ALTER COLUMN "categoriesId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ALTER COLUMN "categoriesId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "PK_4ee1ca1b5f9bde9c995002007f9"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP COLUMN "subcategory_id"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD "subcategories_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "PK_d73b75bb605f53081b746b0385b" PRIMARY KEY ("subcategories_id")`);
    }

}
