import React, { useState } from "react";
import OrderBook from "./lib/orderbook/OrderBook";
import OrderBookComponent from "./components/OrderBook/OrderBook";
import Side from "./lib/orderbook/Side";
import ITCHForm from  "./components/ITCHForm/ITCHForm";
import Order from "./lib/orderbook/Order";
import JsonSource from "./lib/injector/JsonSource";
import sampleData from "./lib/injector/sample.json";

const source = new JsonSource(sampleData);
const bidSide = new Side("buy");
const askSide = new Side("sell");

const App: React.FC = () => {
  const [book, setBook] = useState(new OrderBook(bidSide, askSide));

  const onCreate = (method: string, order: Order) => {
    (book as any)[method](order);
    setBook(new OrderBook(bidSide, askSide));
  };

  const addFromDataSource = () => {
    const dataPoint = source.next();
    onCreate(dataPoint.method, dataPoint.order);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <OrderBookComponent orderbook={book} />
        </div>
        <div className="col-4">
          <button onClick={addFromDataSource}>Next ></button>
          <ITCHForm onCreate={onCreate} />
        </div>
      </div>
    </div>
  );
};

export default App;