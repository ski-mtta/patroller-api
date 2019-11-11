import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToOne } from "typeorm";
import Patroller from "./Patroller";

@Entity()
export default class PhysicalAddress {
    @PrimaryGeneratedColumn()
    key!: number;

    @Column()
    id!: string;

    @Column()
    street_address?: string;

    @Column()
    city!: string;

    @Column()
    state?: string;

    @Column()
    zip_code?: string;

    @OneToOne(type => Patroller)
    @JoinColumn()
    patroller!: Patroller

}