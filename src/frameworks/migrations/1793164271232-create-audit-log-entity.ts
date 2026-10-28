import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuditLogEntity1793164271232 implements MigrationInterface {
    name = 'CreateAuditLogEntity1793164271232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audit_log" ("audit_log_id" SERIAL NOT NULL, "actor_user_id" integer, "action" character varying(100) NOT NULL, "target_type" character varying(100), "target_id" character varying(100), "details" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_66beaecf50c1a5f8a7d31332f9a" PRIMARY KEY ("audit_log_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "audit_log"`);
    }

}
