import React, { useState, useRef } from "react";
import OrderBookComponent from "./components/OrderBook/OrderBook";
import JsonSource from "./lib/data/JsonSource";
import sampleData from "./lib/data/out-2019-06-21.json";

const source = new JsonSource(sampleData);

const App: React.FC = () => {
  const [seconds, setSeconds] = useState("0");
  const orderBookComp = useRef<OrderBookComponent>(null);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <OrderBookComponent 
            ref={orderBookComp}
            source={source}
            seconds={parseInt(seconds)} 
            />

          <input value={seconds} onChange={event => setSeconds(event.target.value)} />
          <button onClick={() => orderBookComp.current!.proceedPoints(37843)}>&gt; 10000</button>
          <button onClick={() => orderBookComp.current!.proceedPoints(1000)}>&gt; 1000</button>
          <button onClick={() => orderBookComp.current!.proceedPoints(100)}>&gt; 100</button>
          <button onClick={() => orderBookComp.current!.proceedPoints(1)}>&gt; 1</button>
        </div>
      </div>
    </div>
  );
};

export default App;