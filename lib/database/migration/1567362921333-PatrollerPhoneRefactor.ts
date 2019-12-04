import { MigrationInterface, QueryRunner } from "typeorm";

export class PatrollerPhoneRefactor1567362921333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "patroller" RENAME COLUMN "phone_number" to "primary_phone"`)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
