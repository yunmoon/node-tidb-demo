
import { provide, BaseService } from "zonetk-core"
import { Order } from "../entity/order";

@provide("orderService")
export default class OrderService extends BaseService <Order>{

  constructor() {
    super(Order);
  }
}