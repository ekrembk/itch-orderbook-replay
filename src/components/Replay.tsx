import React from "react";
import OrderBookComponent from "./OrderBook/OrderBook";
import ExecutionsComponent from "./Executions/Executions";
import DataSource from "../lib/data/DataSource";

interface Props {
    source: DataSource;
    seconds: number;
    transactionData: any;
}

export const Replay: React.FC<Props> = ({ source, seconds, transactionData }) => {
    return (
        <div className="replay">
            <OrderBookComponent 
                source={source}
                seconds={seconds} 
                />

            <ExecutionsComponent
                source={transactionData}
                seconds={seconds}
                />
        </div>
    );
}

export default Replay;