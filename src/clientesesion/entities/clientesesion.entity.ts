import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Clientesesion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    names: string;

    @Column()
    lastNames: string;

    @Column()
    password: string;

    @Column({ default: true})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: false})
    pwIsDefault: boolean;


}
