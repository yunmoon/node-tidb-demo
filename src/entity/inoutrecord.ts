
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "zonetk-core";
@Entity({ name: "inoutrecords1" })
export class Inoutrecord {

    // @PrimaryGeneratedColumn()
    // id: number;

    @Column()
    tradeTime: Date;

    @Column()
    tradeType: number;

    @Column()
    userId: string;

    @Column()
    userCardNo: string;

    @PrimaryGeneratedColumn()
    deviceOrderNo: string;

    @Column()
    stationNo: string;

    @Column()
    lineNo: string;

    @Column()
    deviceType: string;

    @Column()
    deviceSerialNo: string;

    @Column()
    deviceStatus: string;

    @Column()
    qrcode: string;

    @Column()
    scanTime: Date;

    @Column()
    userAccountType: string;

    @Column()
    payAccountNo: string;

    @Column()
    qrcodeType: string;

    @Column()
    qrcodeCertificate: string;

    @Column()
    channelNo: string;

    @Column()
    cardPlatform: string;

    @Column()
    dataSource: number;

    @Column()
    shardingId: number;

    @Column()
    deviceNo: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}