
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "zonetk-core";
@Entity({ name: "inoutrecords-bak" })
export class Inoutrecord {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tradeTime: Date;

    @Column()
    tradeType: number;

    @Column()
    userId: string;

    @Column()
    userCardNo: string;

    @Column()
    stationNo: string;

    @Column()
    deviceNo: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}