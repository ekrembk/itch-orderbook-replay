import React from "react";
import { formatUnix } from "../../lib/time";

interface Props {
    source: any;
    seconds: number;
    inst: string;
}

class ExecutionsComponent extends React.PureComponent<Props> {
    filteredData: any = [];

    componentDidMount() {
        this.setFilteredData();
    }

    setFilteredData() {
        const { inst, source } = this.props;

        this.filteredData = inst.length === 3
            ? source.filter((row: any) => row.buyer_code === inst || row.seller_code === inst)
            : source;
    }

    componentDidUpdate(oldProps: Props) {
        if (this.props.inst !== oldProps.inst || this.props.source !== oldProps.source) {
            this.setFilteredData();
            this.forceUpdate();
        }
    }

    render() {
        const { seconds } = this.props;
        const source = this.filteredData;

        if (source === null) return null;

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

        const data = source.slice(Math.max(0, endIndex - 45), endIndex).reverse();

        return (
            <table className="executions" style={{ border: "1px solid #ddd", width: "100%", fontSize: 12 }}>
                <tbody>
                    {data.map((row: any, i: number) => <tr key={i} style={{ color: row.aggressive_party === "B" ? "blue" : "red" }}><td style={{ paddingRight: 5, borderRight: "1px solid #ddd" }} title={row.seconds}>{formatUnix(row.seconds)}</td><td style={{ paddingRight: 5, borderRight: "1px solid #ddd" }}>{(row.price / 100).toFixed(2)}</td><td style={{ paddingRight: 5, borderRight: "1px solid #ddd" }}>{row.quantity}</td><td style={{ paddingLeft: 5, borderRight: "1px solid #ddd", textAlign: "left" }}>{row.buyer_code}</td><td style={{ paddingLeft: 5, textAlign: "left" }}>{row.seller_code}</td></tr>)}
                </tbody>
            </table>
        );
    }
};

export default ExecutionsComponent;