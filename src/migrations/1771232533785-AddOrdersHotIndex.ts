import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrdersHotIndex1771232533785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX idx_orders_user_created_at_desc
            ON orders (user_id, created_at DESC);
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_orders_user_created_at_desc;
            `);
    }

}
