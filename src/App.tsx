import React, { useState } from "react";
import OrderBook from "./lib/orderbook/OrderBook";
import OrderBookComponent from "./components/OrderBook/OrderBook";
import Side from "./lib/orderbook/Side";
import ITCHForm from  "./components/ITCHForm/ITCHForm";
import Order from "./lib/orderbook/Order";
import JsonSource from "./lib/injector/JsonSource";
import sampleData from "./lib/injector/out-2019-06-20.json";
import Level from "./lib/orderbook/Level";

const source = new JsonSource(sampleData);
const bidSide = new Side("buy");
const askSide = new Side("sell");
const orderIdMap = new Map<string, Level>();
let seconds = "";

var toHHMMSS = (secs: string) => {
  var date = new Date(parseInt(secs, 10)*1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

const App: React.FC = () => {
  const [book, setBook] = useState(new OrderBook(bidSide, askSide, orderIdMap));

  const onCreate = (method: string, order: Order, updateBook = true) => {
    (book as any)[method](order);

    if (updateBook) {
      seconds = toHHMMSS(order.seconds);
      setBook(new OrderBook(bidSide, askSide, orderIdMap));
    }
  };

  const addFromDataSource = (length: number) => {
    for (let i = 0; i < length; i++) {
      const dataPoint = source.next();
      onCreate(dataPoint.method, dataPoint.order, i === length - 1);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <OrderBookComponent orderbook={book} seconds={seconds} />
        </div>
        <div className="col-4">
        <button onClick={() => addFromDataSource(1000)}>1000 ></button>
          <button onClick={() => addFromDataSource(500)}>500 ></button>
          <button onClick={() => addFromDataSource(250)}>250 ></button>
          <button onClick={() => addFromDataSource(10)}>10 ></button>
          <button onClick={() => addFromDataSource(1)}>1 ></button>
          <ITCHForm onCreate={onCreate} />
        </div>
      </div>
    </div>
  );
};

export default App;