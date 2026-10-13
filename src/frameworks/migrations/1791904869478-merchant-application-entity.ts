import { MigrationInterface, QueryRunner } from "typeorm";

export class MerchantApplicationEntity1791904869478 implements MigrationInterface {
    name = 'MerchantApplicationEntity1791904869478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."merchant_application_application_status_enum" AS ENUM('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'DECLINED', 'WITHDRAWN')`);
        await queryRunner.query(`CREATE TYPE "public"."merchant_application_risk_status_enum" AS ENUM('PENDING', 'LOW', 'MEDIUM', 'HIGH', 'PROHIBITED')`);
        await queryRunner.query(`CREATE TABLE "merchant_application" ("application_id" SERIAL NOT NULL, "business_name" character varying(255) NOT NULL, "legal_business_name" character varying(255) NOT NULL, "business_type" character varying(100) NOT NULL, "owner_first_name" character varying(100) NOT NULL, "owner_last_name" character varying(100) NOT NULL, "owner_email" character varying(255) NOT NULL, "owner_contact_number" character varying(50) NOT NULL, "requested_monthly_volume" numeric(14,2) NOT NULL, "average_transaction_amount" numeric(12,2) NOT NULL, "application_status" "public"."merchant_application_application_status_enum" NOT NULL DEFAULT 'DRAFT', "risk_status" "public"."merchant_application_risk_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_user_id" integer NOT NULL, "assigned_reviewer_user_id" integer, CONSTRAINT "PK_a863e0c9b28fd88b6f03b67e87b" PRIMARY KEY ("application_id"))`);
        await queryRunner.query(`ALTER TABLE "merchant_application" ADD CONSTRAINT "FK_7cd7128c83191d933386a959236" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant_application" ADD CONSTRAINT "FK_66a98134c87a2284364a9c6eb62" FOREIGN KEY ("assigned_reviewer_user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant_application" DROP CONSTRAINT "FK_66a98134c87a2284364a9c6eb62"`);
        await queryRunner.query(`ALTER TABLE "merchant_application" DROP CONSTRAINT "FK_7cd7128c83191d933386a959236"`);
        await queryRunner.query(`DROP TABLE "merchant_application"`);
        await queryRunner.query(`DROP TYPE "public"."merchant_application_risk_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."merchant_application_application_status_enum"`);
    }

}
