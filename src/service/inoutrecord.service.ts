
import { provide, BaseService } from "zonetk-core"
import { Inoutrecord } from "../entity/inoutrecord";

@provide("inoutrecordService")
export default class InoutrecordService extends BaseService <Inoutrecord>{

  constructor() {
    super(Inoutrecord);
  }
}