import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import PhysicalAddress from "./PhysicalAddress";
import Schedules from "./Schedules";

@Entity()
export default class Patroller {
    @PrimaryGeneratedColumn()
    key!: number;

    @Column()
    id!: string;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column({ nullable: true })
    sp_number!: number;

    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column()
    primary_phone!: string;

    @Column()
    secondary_phone?: string;

    @OneToOne(type => PhysicalAddress, physicalAddress => physicalAddress.patroller)
    physical_address!: PhysicalAddress;

    @OneToMany(type => Schedules, schedule => schedule.patroller)
    schedules!: Schedules
}