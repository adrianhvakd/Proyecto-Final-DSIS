import { Delete } from "@nestjs/common";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 50})
    nombre: string;

    @Column({type: 'varchar',length: 50})
    apellidos: string;

    @Column({type: 'varchar',length: 100})
    codVivienda: string;

    @Column({type: 'boolean',default:false})
    pagoImpuesto:boolean;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
