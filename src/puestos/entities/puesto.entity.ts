import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('puestos')
export class Puesto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 15, scale: 10 })
    long: number;

    @Column({ type: 'decimal', precision: 15, scale: 10 })
    lat: number;

    @Column({ type: 'varchar', length: 100 })
    ubicacion: string;

    @Column({ type: 'decimal', precision: 5, scale: 2})
    precio: number;

    @Column({ type: 'boolean', default: true })
    disponible: boolean;

    @Column({ type: 'varchar', length: 100, default: null })
    comprador: string | null;

    @Column({ type: 'int'})
    numero: number;

    @Column({ type: 'int', default: null })
    factura: number | null;

    @Column({ type: 'varchar', length: 100, default: null })
    codVivienda: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
