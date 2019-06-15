import DataPoint from "./DataPoint";

export default interface DataSource {
    next(): DataPoint;
}