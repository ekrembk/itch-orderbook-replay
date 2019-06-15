import React, { useState } from "react";
import OrderBook from "./lib/orderbook/OrderBook";
import OrderBookComponent from "./components/OrderBook/OrderBook";
import Side from "./lib/orderbook/Side";
import OrderType from "./lib/orderbook/OrderType";
import ITCHForm from  "./components/ITCHForm/ITCHForm";
import Order from "./lib/orderbook/Order";

const bidSide = new Side(OrderType.Buy);
const askSide = new Side(OrderType.Sell);

const App: React.FC = () => {
  const [book, setBook] = useState(new OrderBook(bidSide, askSide));

  const onCreate = (method: string, order: Order) => {
    (book as any)[method](order);
    setBook(new OrderBook(bidSide, askSide));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <OrderBookComponent orderbook={book} />
        </div>
        <div className="col-4">
          <ITCHForm onCreate={onCreate} />
        </div>
      </div>
    </div>
  );
};

export default App;