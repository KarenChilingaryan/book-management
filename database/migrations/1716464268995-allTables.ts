import { MigrationInterface, QueryRunner } from "typeorm";

export class AllTables1716464268995 implements MigrationInterface {
    name = 'AllTables1716464268995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`isbn\` varchar(255) NOT NULL, \`publishedDate\` datetime NOT NULL, \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`biography\` text NOT NULL, \`dateOfBirth\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_66a4f0f47943a0d99c16ecf90b2\` FOREIGN KEY (\`authorId\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_66a4f0f47943a0d99c16ecf90b2\``);
        await queryRunner.query(`DROP TABLE \`author\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
