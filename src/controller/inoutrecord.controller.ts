import { provide, inject, controller, Http, BaseController } from "zonetk-core"
import InoutrecordService from "../service/inoutrecord.service";
import { Inoutrecord } from "../entity/inoutrecord";
import OrderService from "../service/order.service";
import _ = require("lodash");
import moment = require("moment");
import { Order } from "../entity/order";
@provide("inoutrecordController")
@controller("/")
export default class InoutrecordController extends BaseController {

  @inject("inoutrecordService") inoutrecordService: InoutrecordService
  @inject("orderService") orderService: OrderService
  @Http.get("/inoutrecords")
  public async getInoutrecords() {
    const { userId } = this.ctx.request.query
    const result = await this.inoutrecordService.findAll({
      where: {
        userId
      },
      take: 10
    });
    this.ctx.body = {
      code: 0,
      msg: "SUCCESS",
      data: result
    }
  }

  @Http.get("/userCard/inoutrecords")
  async getInoutrecordsByUserCardNo() {
    const { userCardNo } = this.ctx.request.query
    const result = await this.inoutrecordService.findAll({
      where: {
        userCardNo
      },
      take: 10
    });
    this.ctx.body = {
      code: 0,
      msg: "SUCCESS",
      data: result
    }
  }

  @Http.get("/inoutrecord/count")
  async countInoutrecordsByUserId() {
    const { userId } = this.ctx.request.query
    const result = await this.inoutrecordService.count({
      where: {
        userId
      }
    });
    this.ctx.body = {
      code: 0,
      msg: "SUCCESS",
      data: result
    }
  }
  @Http.post("/inoutrecord")
  async create() {
    const { userId } = this.ctx.request.body;
    const order = await this.transaction(async (tm) => {
      const inrecord = new Inoutrecord();
      inrecord.deviceNo = "123df";
      inrecord.userId = userId;
      inrecord.userCardNo = userId;
      inrecord.stationNo = "2345";
      inrecord.tradeTime = new Date();
      inrecord.tradeType = 26;
      inrecord.deviceOrderNo = `${moment().format("YYYYMMDDHHmmssSSS")}${_.random(1000, 9999)}`;
      inrecord.cardPlatform = "5000";
      inrecord.channelNo = "5000";
      inrecord.dataSource = 6010;
      inrecord.deviceSerialNo = `${moment().format("YYYYMMDDHHmmssSSS")}`;
      inrecord.deviceStatus = "0";
      inrecord.deviceType = "1";
      inrecord.payAccountNo = "5000EZ8Z8QEQ97TP";
      inrecord.qrcode = "1245tygfdsd";
      inrecord.qrcodeCertificate = "0000000000000001";
      inrecord.qrcodeType = "01";
      inrecord.scanTime = new Date();
      inrecord.shardingId = 1;
      inrecord.userAccountType = "0000000001";
      inrecord.lineNo = "01";
      await this.inoutrecordService.save(inrecord, tm);
      const outrecord = new Inoutrecord();
      outrecord.deviceNo = "123df";
      outrecord.userId = userId;
      outrecord.userCardNo = userId;
      outrecord.stationNo = "2345";
      outrecord.tradeTime = new Date();
      outrecord.tradeType = 26;
      outrecord.deviceOrderNo = `${moment().format("YYYYMMDDHHmmssSSS")}${_.random(1000, 9999)}`;
      outrecord.cardPlatform = "5000";
      outrecord.channelNo = "5000";
      outrecord.dataSource = 6010;
      outrecord.deviceSerialNo = `${moment().format("YYYYMMDDHHmmssSSS")}`;
      outrecord.deviceStatus = "0";
      outrecord.deviceType = "1";
      outrecord.payAccountNo = "5000EZ8Z8QEQ97TP";
      outrecord.qrcode = "1245tygfdsd";
      outrecord.qrcodeCertificate = "0000000000000001";
      outrecord.qrcodeType = "01";
      outrecord.scanTime = new Date();
      outrecord.shardingId = 1;
      outrecord.userAccountType = "0000000001";
      outrecord.lineNo = "01";
      await this.inoutrecordService.save(outrecord, tm);
      let order = new Order();
      order.userId = userId;
      order.tradeTime = new Date();
      order.shardingId = 1;
      order.inDeviceOrderNo = inrecord.deviceOrderNo;
      order.outDeviceOrderNo = outrecord.deviceOrderNo;
      order.orderNo = `${moment().format("YYYYMMDDHHmmssSSS")}${_.random(1000, 9999)}`;
      return this.orderService.save(order, tm);
    });
    this.ctx.body = {
      code: 0,
      msg: "SUCCESS",
      data: order
    }
  }

  @Http.post("/inoutrecord/update")
  async update() {
    const { deviceOrderNo } = this.ctx.request.body;
    await this.inoutrecordService.update({
      deviceOrderNo
    }, {
      userId: this.generateRandomStr("string", 5)
    });
    this.ctx.body = {
      code: 0,
      msg: "SUCCESS"
    }
  }
  //生成随机字符串
  generateRandomStr(type: "string" | "integer" = "string", length = 5) {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (type === "integer") {
      chars = "0123456789";
    }
    let noceStr = "",
      maxPos = chars.length;
    while (length--) noceStr += chars[(Math.random() * maxPos) | 0];
    return noceStr;
  }

  @Http.post("/inoutrecord/delete")
  async delete() {
    const { userId } = this.ctx.request.body;
    await this.inoutrecordService.delete({
      userId
    });
    this.ctx.body = {
      code: 0,
      msg: "SUCCESS"
    }
  }
}