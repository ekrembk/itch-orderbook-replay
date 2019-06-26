import React, { useState } from "react";
import OrderBookComponent from "./OrderBook/OrderBook";
import ExecutionsComponent from "./Executions/Executions";
import useSource from "../lib/hooks/useSource";

interface Props {
    seconds: number;
    date: string;
}

export const Replay: React.FC<Props> = ({ seconds, date }) => {
    const [code, setCode] = useState("ISCTR");
    const [codeInput, setCodeInput] = useState(code);
    const [inst, setInst] = useState("");
	const [instInput, setInstInput] = useState("");
    
    const itchSource = useSource("http://replay.fintables.com/data/" + date + "/" + code + "/itch.json", {}, true);
    const transactionData = useSource("http://replay.fintables.com/data/" + date + "/" + code + "/transactions.json", {}, false); 

    if (!itchSource.response || !transactionData) return <div>Loading...</div>;
    
    return (
        <div className="replay">
            <div className="replay__title clearfix mb-3">
                <div className="input-group input-group-sm" style={{ float: "left", width: "70%" }}>
                    <input value={codeInput} onChange={e => setCodeInput(e.target.value)} type="text" className="form-control" placeholder="Symbol" />
                    <input value={instInput} onChange={e => setInstInput(e.target.value)} type="text" className="form-control" placeholder="Inst" />
                    <div className="input-group-append">
                        <button onClick={() => { setCode(codeInput);setInst(instInput) }} className="btn btn-outline-secondary" type="button">Change</button>
                    </div>
                </div>
            </div>

            <OrderBookComponent 
                source={itchSource.response}
                seconds={seconds} 
                />

            <ExecutionsComponent
                source={transactionData.response}
                seconds={seconds}
                inst={inst}
                />
        </div>
    );
}

export default Replay;