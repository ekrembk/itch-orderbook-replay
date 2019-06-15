import React from "react";
import OrderType from "../../lib/orderbook/OrderType";

interface Props {
    size: number;
    quantity: number;
    price: number;
    type: OrderType;
}

const LevelComponent: React.FC<Props> = ({ size, quantity, price, type }) => {
    if (type === OrderType.Buy) {
        return <tr><td>{size}</td><td>{quantity}</td><td>{(price / 100).toFixed(2)}</td></tr>
    }

    return <tr><td>{(price / 100).toFixed(2)}</td><td>{quantity}</td><td>{size}</td></tr>
};

export default LevelComponent;