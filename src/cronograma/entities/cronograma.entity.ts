import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Cronograma {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_evento: string;

    @Column({ type: 'date' })
    fecha_inicio: Date;

    @Column({ type: 'date' })
    fecha_fin: Date;

    @Column()
    fase: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
}
