import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToOne, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import Patroller from "./Patroller";

@Entity()
export default class Schedules {
    @PrimaryGeneratedColumn()
    key!: number;

    @Column()
    id!: string;

    @Column()
    location!: string;

    @Column()
    start_date!: Date;

    @Column()
    end_date!: Date;

    @Column()
    additional_guests!: number;

    @Column()
    day!: boolean;

    @Column()
    overnight!: boolean;

    @ManyToOne(type => Patroller)
    @JoinColumn()
    patroller!: Patroller

}