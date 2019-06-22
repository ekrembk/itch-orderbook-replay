import React from "react";

interface Props {
    source: any;
    seconds: number;
}

class ExecutionsComponent extends React.PureComponent<Props> {
    render() {
        const { source, seconds } = this.props;
        let endIndex: number;

        for (endIndex = 0; endIndex < source.length; endIndex++) {
            const row = source[endIndex];
            if (row.seconds > seconds) {
                break;
            }
        }

        if (endIndex === 0) {
            return null;
        }

        const data = source.slice(Math.max(0, endIndex - 15), endIndex).reverse();

        return (
            <table className="executions" style={{ border: "1px solid #ddd", width: "100%", fontSize: 12 }}>
                <tbody>
                    {data.map((row: any, i: number) => <tr key={i} style={{ color: row.aggressive_party === "B" ? "blue" : "red" }}><td style={{ borderRight: "1px solid #ddd" }}>{row.seconds}</td><td style={{ borderRight: "1px solid #ddd" }}>{(row.price / 100).toFixed(2)}</td><td style={{ borderRight: "1px solid #ddd" }}>{row.quantity}</td><td style={{ borderRight: "1px solid #ddd", textAlign: "left" }}>{row.buyer_code}</td><td style={{ textAlign: "left" }}>{row.seller_code}</td></tr>)}
                </tbody>
            </table>
        );
    }
};

export default ExecutionsComponent;