import React from "react";
import Level from "../../lib/orderbook/Level";
import OrderType from "../../lib/orderbook/OrderType";

interface Props {
    level: Level;
    type: OrderType;
}

const LevelComponent: React.FC<Props> = ({ level, type }) => {
    console.log("Level render", level.price);

    if (type === OrderType.Buy) {
        return <tr><td>{level.orders.size}</td><td>{level.quantity}</td><td>{(level.price / 100).toFixed(2)}</td></tr>
    }

    return <tr><td>{(level.price / 100).toFixed(2)}</td><td>{level.quantity}</td><td>{level.orders.size}</td></tr>
};

export default LevelComponent;