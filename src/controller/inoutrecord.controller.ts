import { provide, inject, controller, get, BaseController } from "zonetk-core"
import InoutrecordService from "../service/inoutrecord.service";
@provide("inoutrecordController")
@controller("/")
export default class InoutrecordController extends BaseController {

  @inject("inoutrecordService") inoutrecordService: InoutrecordService
  @get("/inoutrecords")
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
}