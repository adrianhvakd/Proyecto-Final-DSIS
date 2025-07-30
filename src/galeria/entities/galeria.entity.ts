import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Galeria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imagen: string;

    @Column()
    titulo: string;

    @Column({type: 'text'})
    descripcion: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

}
