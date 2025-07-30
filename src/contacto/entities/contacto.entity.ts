import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contacto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    usuario: string;

    @Column()
    email: string;

    @Column()
    celular: string;

    @Column({type: 'text'})
    Mensaje: string;

    @CreateDateColumn()
    RecibidoAt: Date;
}
