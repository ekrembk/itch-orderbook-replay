import React, { useState, useRef, useEffect } from "react";
import OrderBookComponent from "./components/OrderBook/OrderBook";
import ExecutionsComponent from "./components/Executions/Executions";
import JsonSource from "./lib/data/JsonSource";
import sampleData from "./lib/data/out-2019-06-20.json";
import sampleExecutionData from "./lib/data/out-2019-06-20-emirler.json";

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

  useInterval(() => setSeconds(seconds + parseFloat(speed) / 10), playing ? 100 : 999999999);

  return (
    <div className="container" style={{ padding: 0, overflow: "hidden" }}>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <OrderBookComponent 
            ref={orderBookComp}
            source={source}
            seconds={seconds} 
            />

          <ExecutionsComponent
            source={sampleExecutionData}
            seconds={seconds}
            />

          <label><input type="checkbox" checked={playing} onChange={e => setPlaying(!playing)} /> <strong>Oynat</strong></label>

          <br /><br />
          <strong>Hız</strong>
          <select value={speed} onChange={event => setSpeed(event.target.value)}>
            <option value={1}>{1}x</option>
            <option value={5}>{55}x</option>
            <option value={10}>{10}x</option>
            <option value={25}>{25}x</option>
            <option value={100}>{100}x</option>
            <option value={250}>{250}x</option>
          </select>

          <br /><br />

          <strong>İleri sar</strong>
          <br />
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds + 1)}>&gt; 1s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds + 10)}>&gt; 10s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds + 20)}>&gt; 20s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds + 3600)}>&gt; 1h</button>
          </div>

          <br />

          <strong>Geri al</strong>
          <br />
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds - 1)}>&lt; 1s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds - 10)}>&lt; 10s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds - 20)}>&lt; 20s</button>
            <button type="button" className="btn btn-secondary" onClick={() => setSeconds(seconds - 3600)}>&lt; 1h</button>
          </div>
          

          {/*
          <br /><br />

          <input value={seconds} onChange={event => setSeconds(parseFloat(event.target.value))} />
          <button onClick={() => orderBookComp.current!.proceedPoints(37843)}>&gt; 10000</button>
          <button onClick={() => orderBookComp.current!.proceedPoints(1000)}>&gt; 1000</button>
          <button onClick={() => orderBookComp.current!.proceedPoints(100)}>&gt; 100</button>
          <button onClick={() => orderBookComp.current!.proceedPoints(1)}>&gt; 1</button>
          */}
        </div>
      </div>
    </div>
  );
};

export default App;