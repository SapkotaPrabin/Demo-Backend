import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRiskDecisionColumn1793111699187 implements MigrationInterface {
    name = 'AddRiskDecisionColumn1793111699187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."merchant_application_risk_decision_enum" AS ENUM('PENDING', 'APPROVE', 'REJECT')`);
        await queryRunner.query(`ALTER TABLE "merchant_application" ADD "risk_decision" "public"."merchant_application_risk_decision_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TYPE "public"."merchant_application_application_status_enum" ADD VALUE 'INFO_REQUIRED'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."merchant_application_application_status_enum_old" AS ENUM('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'DECLINED', 'WITHDRAWN')`);
        await queryRunner.query(`ALTER TABLE "merchant_application" ALTER COLUMN "application_status" TYPE "public"."merchant_application_application_status_enum_old" USING "application_status"::"text"::"public"."merchant_application_application_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."merchant_application_application_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."merchant_application_application_status_enum_old" RENAME TO "merchant_application_application_status_enum"`);
        await queryRunner.query(`ALTER TABLE "merchant_application" DROP COLUMN "risk_decision"`);
        await queryRunner.query(`DROP TYPE "public"."merchant_application_risk_decision_enum"`);
    }

}
