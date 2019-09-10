
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "zonetk-core";
@Entity({ name: "orders" })
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    orderNo: string;

    @Column()
    inDeviceOrderNo: string;

    @Column()
    outDeviceOrderNo: string;

    @Column()
    shardingId: number;

    @Column()
    tradeTime: Date;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}