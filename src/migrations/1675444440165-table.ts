import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675444440165 implements MigrationInterface {
    name = 'table1675444440165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying(32) NOT NULL, "user_email" character varying(128) NOT NULL, "user_password" character varying(32) NOT NULL, "user_tel" character varying(32) NOT NULL, "user_role" character varying(32) NOT NULL, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
