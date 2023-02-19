import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675875247209 implements MigrationInterface {
    name = 'table1675875247209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30"`);
        await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "score" ADD "usersId" uuid`);
        await queryRunner.query(`ALTER TABLE "score" ADD "productsId" uuid`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_f809ba06f8a61836a840bf00820" FOREIGN KEY ("usersId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_300ded292060d162ae402ebd797" FOREIGN KEY ("productsId") REFERENCES "products"("products_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_300ded292060d162ae402ebd797"`);
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_f809ba06f8a61836a840bf00820"`);
        await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "productsId"`);
        await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "score" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
