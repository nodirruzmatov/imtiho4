import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675661995873 implements MigrationInterface {
    name = 'table1675661995873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ALTER COLUMN "categoriesId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ALTER COLUMN "categoriesId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_0064c4dc27d676c0fcdd0a812c8" FOREIGN KEY ("categoriesId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
