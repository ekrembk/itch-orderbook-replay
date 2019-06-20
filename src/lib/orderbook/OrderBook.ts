import Order from "./Order";
import Side from "./Side";
import Level from "./Level";

export class OrderBook {
    constructor(public bidSide: Side,
        public askSide: Side,
        private orderIdLevelMap = new Map<string, Level>()) {}
    
    public add(order: Order) {
        // console.log("ADD", order);
        const level = this.getLevelFromPrice(order.type, order.price);
        level.add(order);
        this.orderIdLevelMap.set(order.type + order.id, level);
    }

    public delete(order: Order) {
        // console.log("DELETE", order);
        this.getLevelFromId(order.type, order.id).delete(order);
        this.orderIdLevelMap.delete(order.type + order.id);
    }

    public replace(order: Order) {
        // console.log("REPLACE", order);
        this.getLevelFromId(order.type, order.id).delete(order);
        this.orderIdLevelMap.delete(order.type + order.id);
        this.add(order);
    }

    public execute(order: Order) {
        // console.log("EXECUTE", order);
        const orderFilled = this.getLevelFromId(order.type, order.id).execute(order);
        if (orderFilled) {
            this.orderIdLevelMap.delete(order.type + order.id);
        }
    }

    private getLevelFromId(type: string, id: string): Level {
        return this.orderIdLevelMap.get(type + id)!;
    }

    private getLevelFromPrice(type: string, price: number): Level {
        const side = type === "buy"
            ? this.bidSide
            : this.askSide;

        return side.getOrCreateLevel(price);
    }
}

export default OrderBook;