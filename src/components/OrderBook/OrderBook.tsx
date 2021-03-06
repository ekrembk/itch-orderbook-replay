import React from "react";
import OrderBook from "../../lib/orderbook/OrderBook";
import SideComponent from "./Side";
import "./orderbook.css";
import DataSource from "../../lib/data/DataSource";
import Side from "../../lib/orderbook/Side";
import Level from "../../lib/orderbook/Level";
import { NoMoreDataException } from "../../lib/data/Exceptions";

interface Props {
    source: DataSource;
    seconds: number;
}

interface State {
    orderBook: OrderBook
}

class OrderBookComponent extends React.Component<Props, State> {
    bidSide: Side = new Side("buy");
    askSide: Side = new Side("sell");
    orderIdMap: Map<string, Level> = new Map<string, Level>();

    constructor(props: Props) {
        super(props);

        this.state = {
            orderBook: this.createOrderBook()
        };
    }

    componentDidUpdate(oldProps: Props) {
        if (this.props.seconds < oldProps.seconds || this.props.source !== oldProps.source) {
            console.log("from scratch");
            const orderBook = this.createOrderBook();
            this.proceedSeconds(orderBook, this.props.seconds);
            this.setState({ orderBook });
        } else if (this.props.seconds > oldProps.seconds) {
            this.proceedSeconds(this.state.orderBook, this.props.seconds);
            this.setState({ "orderBook": this.state.orderBook });
        }
    }

    createOrderBook(): OrderBook {
        this.props.source.reset();
        this.bidSide = new Side("buy");
        this.askSide = new Side("sell");
        this.orderIdMap = new Map<string, Level>();

        return new OrderBook(this.bidSide, this.askSide, this.orderIdMap);
    }

    public proceedPoints(length: number) {
        const { orderBook } = this.state;

        for (let i = 0; i < length; i++) {
            try {
                const { method, order } = this.props.source.next();
                (orderBook as any)[method](order);
            } catch (e) {
                if (e instanceof NoMoreDataException) {
                    console.log("no more data")
                    break;
                } else {
                    throw e;
                }
            }
        }

        this.setState({ orderBook });
    }

    proceedSeconds(orderBook: OrderBook, seconds: number) {
        while (true) {
            try {
                const { method, order } = this.props.source.next();

                if (order.seconds > seconds) {
                    this.props.source.revert();
                    break;
                }
    
                (orderBook as any)[method](order);
            } catch (e) {
                if (e instanceof NoMoreDataException) {
                    console.log("no more data")
                    break;
                } else {
                    throw e;
                }
            }
        }
    }

    render() {
        const { orderBook } = this.state;

        return (
            <div className="orderbook">
                <div className="orderbook__sides">
                    <div className="row no-gutters">
                        <div className="col">
                            <SideComponent side={orderBook.bidSide} />
                        </div>
                        
                        <div className="col">
                            <SideComponent side={orderBook.askSide} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderBookComponent;