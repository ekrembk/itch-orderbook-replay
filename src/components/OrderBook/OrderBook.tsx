import React from "react";
import OrderBook from "../../lib/orderbook/OrderBook";
import Side from "./Side";

interface Props {
    orderbook: OrderBook
}

const OrderBookComponent: React.FC<Props> = ({ orderbook }) => (
    <div className="orderbook">
        <div className="orderbook__title">$APPL</div>
        <div className="orderbook__sides">
            <div className="row-fluid">
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