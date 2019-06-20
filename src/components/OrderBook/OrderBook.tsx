import React from "react";
import OrderBook from "../../lib/orderbook/OrderBook";
import Side from "./Side";
import "./orderbook.css";

interface Props {
    orderbook: OrderBook,
    seconds: string
}

const OrderBookComponent: React.FC<Props> = ({ orderbook, seconds }) => (
    <div className="orderbook">
        <div className="orderbook__title">$ASELS &lt;{seconds}&gt;</div>
        <div className="orderbook__sides">
            <div className="row no-gutters">
                <div className="col">
                    <Side side={orderbook.bidSide} />
                </div>
                
                <div className="col">
                    <Side side={orderbook.askSide} />
                </div>
            </div>
        </div>
    </div>
);

export default OrderBookComponent;