import React from "react";
import "./level.css";

interface Props {
    size: number;
    quantity: number;
    price: number;
    type: string;
}

class LevelComponent extends React.PureComponent<Props> {
    animation: any;

    componentDidUpdate(oldProps: Props) {
        if (this.props.quantity != oldProps.quantity) {
            this.animation = "highlight";
        } else {
            this.animation = "";
        }
    }

    render() {
        const { size, quantity, price, type } = this.props;

        if (type === "buy") {
            return <tr className={this.animation}><td>{size}</td><td style={{width: 70}}>{quantity}</td><td>{(price / 100).toFixed(2)}</td></tr>
        }

        return <tr className={this.animation}><td>{(price / 100).toFixed(2)}</td><td style={{width: 70}}>{quantity}</td><td>{size}</td></tr>
    }
};

export default LevelComponent;