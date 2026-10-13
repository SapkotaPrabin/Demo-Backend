import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordFieldForUser1791903949737 implements MigrationInterface {
    name = 'AddPasswordFieldForUser1791903949737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
