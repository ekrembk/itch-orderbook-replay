import React from "react";
import Side from "../../lib/orderbook/Side";
import Level from "../../lib/orderbook/Level";
import LevelComponent from "./Level";
import OrderType from "../../lib/orderbook/OrderType";

interface Props {
    side: Side
};

const SideComponent: React.FC<Props> = ({ side }) => {
    const { type, levels } = side;
    
    return (
        <table className="side">
            <thead>
                {type === OrderType.Buy && <tr><th>Orders</th><th>Lot</th><th>Bid</th></tr>}
                {type === OrderType.Sell && <tr><th>Ask</th><th>Lot</th><th>Orders</th></tr>}
            </thead>
            <tbody>
                {levels.map((level: Level) => <LevelComponent key={level.price} level={level} type={type} />)}
            </tbody>
        </table>
    );
}

export default SideComponent;