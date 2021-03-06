import React from "react";
import Side from "../../lib/orderbook/Side";
import Level from "../../lib/orderbook/Level";
import LevelComponent from "./Level";
import "./side.css";

interface Props {
    side: Side
};

const SideComponent: React.FC<Props> = ({ side }) => {
    const { type, levels } = side;

    const levelProps = levels.map((level: Level) => ({
        key: level.price,
        size: level.orders.size,
        quantity: level.quantity,
        price: level.price,
        type: type
    })).filter((row: any) => row.quantity > 0).slice(0, 5);
    
    return (
        <div>
            <table className="side">
                <thead>
                    {type === "buy" && <tr><th>Orders</th><th>Lot</th><th>Bid</th></tr>}
                    {type === "sell" && <tr><th>Ask</th><th>Lot</th><th>Orders</th></tr>}
                </thead>
                <tbody>
                    {levelProps.map((props: any) => <LevelComponent {...props} />)}
                </tbody>
            </table>
        </div>
    );
}

export default SideComponent;