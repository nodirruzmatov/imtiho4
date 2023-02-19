import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675874868461 implements MigrationInterface {
    name = 'table1675874868461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "score" ("score_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score_ball" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_757ddc90313d9e3cf1f49d6857a" PRIMARY KEY ("score_id"))`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_327e5a5890df4462edf4ac9fa30"`);
        await queryRunner.query(`DROP TABLE "score"`);
    }

}
