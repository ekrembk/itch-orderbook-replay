import React, { useState, useRef, useEffect } from "react";
import OrderBookComponent from "./components/OrderBook/OrderBook";
import JsonSource from "./lib/data/JsonSource";
import sampleData from "./lib/data/out-2019-06-21.json";

const source = new JsonSource(sampleData);

function useInterval(callback: CallableFunction, delay: number) {
  const savedCallback: any = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const App: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [speed, setSpeed] = useState("1");
  const [playing, setPlaying] = useState(false);
  const orderBookComp = useRef<OrderBookComponent>(null);

  useInterval(() => setSeconds(seconds + parseFloat(speed) / 10), playing ? 100 : 9999999999);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <OrderBookComponent 
            ref={orderBookComp}
            source={source}
            seconds={seconds} 
            />

          <input type="checkbox" checked={playing} onChange={e => setPlaying(!playing)} />

          <button onClick={() => setSeconds(seconds + 1)}>&gt; 1s</button>
          <button onClick={() => setSeconds(seconds + 10)}>&gt; 10s</button>
          <button onClick={() => setSeconds(seconds + 20)}>&gt; 20s</button>
          <button onClick={() => setSeconds(seconds + 3600)}>&gt; 1h</button>

          <input value={speed} onChange={event => setSpeed(event.target.value)} />
          <input value={seconds} onChange={event => setSeconds(parseFloat(event.target.value))} />
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